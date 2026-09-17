const CACHE='seng-shell-v2'
const APP_SHELL=['./','./manifest.webmanifest','./icon.svg']

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))))
  self.clients.claim()
})

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return
  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request)
      if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}
      return response
    }catch{
      const cached=await caches.match(event.request)
      if(cached)return cached
      if(event.request.mode==='navigate')return (await caches.match('./'))||Response.error()
      return Response.error()
    }
  })())
})
