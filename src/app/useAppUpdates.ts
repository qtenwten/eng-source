import { useCallback, useEffect, useRef, useState } from 'react'

const CHECK_INTERVAL_MS = 5 * 60 * 1000

function reloadFresh() {
  // A unique navigation URL prevents an old iOS home-screen web app from
  // reusing a stale navigation entry while preserving any existing query.
  const next = new URL(window.location.href)
  next.searchParams.set('_seng_update', String(Date.now()))
  window.location.replace(next.toString())
}

export function useAppUpdates() {
  const [available, setAvailable] = useState(false)
  const [applying, setApplying] = useState(false)
  const [error, setError] = useState(false)
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null)
  const activationRequested = useRef(false)

  useEffect(() => {
    if (!import.meta.env.PROD) return

    let alive = true
    let registration: ServiceWorkerRegistration | null = null
    let watchedWorker: ServiceWorker | null = null
    let checking = false

    const onControllerChange = () => {
      if (!activationRequested.current) return
      activationRequested.current = false
      reloadFresh()
    }

    const onWorkerStateChange = () => {
      if (alive && navigator.serviceWorker.controller &&
          (registration?.waiting || watchedWorker?.state === 'installed')) {
        setAvailable(true)
      }
    }

    const watchWorker = (worker: ServiceWorker | null) => {
      watchedWorker?.removeEventListener('statechange', onWorkerStateChange)
      watchedWorker = worker
      watchedWorker?.addEventListener('statechange', onWorkerStateChange)
      onWorkerStateChange()
    }

    const onUpdateFound = () => watchWorker(registration?.installing ?? null)

    const checkForUpdates = async () => {
      if (!alive || !navigator.onLine || checking) return
      checking = true
      try {
        const response = await fetch(new URL('./version.json', document.baseURI), { cache: 'no-store' })
        if (response.ok) {
          const info: unknown = await response.json()
          if (typeof info === 'object' && info !== null && 'version' in info &&
              typeof info.version === 'string' && info.version !== __SENG_BUILD_ID__) {
            setAvailable(true)
          }
        }
      } catch {
        // Offline or temporarily unreachable hosting must not interrupt learning.
      } finally {
        checking = false
      }
      try { await registrationRef.current?.update() } catch { /* Safari may pause SW updates. */ }
    }

    const register = async () => {
      if (!('serviceWorker' in navigator)) return
      try {
        const found = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
        if (!alive) return
        registration = found
        registrationRef.current = found
        found.addEventListener('updatefound', onUpdateFound)
        watchWorker(found.installing)
        if (found.waiting && navigator.serviceWorker.controller) setAvailable(true)
        await found.update()
      } catch {
        // The version endpoint still provides an update prompt without SW support.
      }
    }

    const onFocus = () => { void checkForUpdates() }
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') void checkForUpdates()
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', onControllerChange)
    }
    window.addEventListener('focus', onFocus)
    window.addEventListener('online', onFocus)
    document.addEventListener('visibilitychange', onVisibilityChange)
    const interval = window.setInterval(onFocus, CHECK_INTERVAL_MS)
    void register()
    void checkForUpdates()

    return () => {
      alive = false
      registration?.removeEventListener('updatefound', onUpdateFound)
      watchedWorker?.removeEventListener('statechange', onWorkerStateChange)
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange)
      }
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('online', onFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.clearInterval(interval)
    }
  }, [])

  const applyUpdate = useCallback(async () => {
    if (applying) return
    if (!navigator.onLine) {
      setError(true)
      return
    }
    setError(false)
    setApplying(true)
    try {
      const registration = registrationRef.current
      if (registration) {
        await registration.update()
        // In some browsers update() finishes before the new worker installs.
        if (!registration.waiting && registration.installing) {
          const worker = registration.installing
          await Promise.race([
            new Promise<void>(resolve => {
              if (worker.state !== 'installing') return resolve()
              const onState = () => {
                if (worker.state === 'installing') return
                worker.removeEventListener('statechange', onState)
                resolve()
              }
              worker.addEventListener('statechange', onState)
            }),
            new Promise<void>(resolve => window.setTimeout(resolve, 2500)),
          ])
        }
        if (registration.waiting) {
          activationRequested.current = true
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          window.setTimeout(() => {
            if (activationRequested.current) {
              activationRequested.current = false
              reloadFresh()
            }
          }, 5000)
          return
        }
      }
      // Covers iOS standalone mode when the SW is suspended or unavailable.
      reloadFresh()
    } catch {
      reloadFresh()
    }
  }, [applying])

  return { available, applying, error, applyUpdate }
}
