const VERSION='__SENG_BUILD_ID__'
const CACHE='seng-shell-'+VERSION
const APP_SHELL=['./','./manifest.webmanifest','./icon.svg']

// Wait until the learner requests the update; never interrupt an active lesson.
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)))
})

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING')self.skipWaiting()
})

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys()
    await Promise.all(keys.filter(key=>key.startsWith('seng-shell-')&&key!==CACHE).map(key=>caches.delete(key)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return
  const url=new URL(event.request.url)
  if(url.origin!==self.location.origin)return
  // The version endpoint must always be fetched from the network.
  if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/sw.js'))return
  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request)
      if(response.ok&&response.type!=='opaque'){
        const cache=await caches.open(CACHE)
        const key=event.request.mode==='navigate'?new Request(self.registration.scope):event.request
        await cache.put(key,response.clone())
      }
      return response
    }catch{
      const cached=await caches.match(event.request)
      if(cached)return cached
      if(event.request.mode==='navigate')return (await caches.match(self.registration.scope))||Response.error()
      return Response.error()
    }
  })())
})
