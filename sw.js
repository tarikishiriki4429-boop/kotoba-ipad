// Kotoba Writer: cache refresh for the October 11, 2026 license update.
// App build and AI worker remain build 37. Only the Service Worker cache generation changes.
const CACHE='kotoba-writer-shell-v38';
const PRIVACY_FLAG='kotoba-writer-privacy-lock-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./licenses.html','./ai-worker.js?v=37'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kotoba-writer-shell-')&&k!==CACHE).map(k=>caches.delete(k))))
  ]));
});
self.addEventListener('message',event=>{
  const data=event.data||{};
  if(data.type!=='SET_OFFLINE_ONLY')return;
  event.waitUntil(data.enabled?caches.open(PRIVACY_FLAG):caches.delete(PRIVACY_FLAG));
});
async function offlineOnly(){return caches.has(PRIVACY_FLAG)}
async function cacheOnly(request){
  const cached=await caches.match(request);
  if(cached)return cached;
  if(request.mode==='navigate'){
    const fallback=await caches.match('./index.html');
    if(fallback)return fallback;
  }
  return new Response('Blocked by privacy mode / offline cache miss',{status:503});
}
async function cacheFirst(request){
  const cached=await caches.match(request);
  if(cached)return cached;
  try{
    const response=await fetch(request);
    if(response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
    }
    return response;
  }catch(error){
    if(request.mode==='navigate'){
      const fallback=await caches.match('./index.html');
      if(fallback)return fallback;
    }
    return new Response('Offline and not cached',{status:503});
  }
}
// License notices should refresh when online, while remaining available offline.
async function licenseNetworkFirst(request){
  try{
    const response=await fetch(request);
    if(response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
      return response;
    }
    const cached=await caches.match(request);
    return cached||response;
  }catch(error){
    return await caches.match(request) || await caches.match('./licenses.html') ||
      new Response('License page unavailable offline',{status:503});
  }
}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith((async()=>{
    if(await offlineOnly())return cacheOnly(event.request);
    const url=new URL(event.request.url);
    if(url.origin===self.location.origin && url.pathname.endsWith('/licenses.html'))
      return licenseNetworkFirst(event.request);
    if(url.origin===self.location.origin)return cacheFirst(event.request);
    if(url.hostname==='esm.run')return cacheFirst(event.request);
    return fetch(event.request);
  })());
});
