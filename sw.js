// Kotoba Writer build37: 保存済みのアプリ本体を優先し、毎回の再取得を減らす。
// 更新時はCACHEとindex.htmlのBUILDとai-workerのURLを同時に変更する。
const CACHE='kotoba-writer-shell-v37';
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
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith((async()=>{
    if(await offlineOnly())return cacheOnly(event.request);
    const url=new URL(event.request.url);
    // App shell is cache-first; Netlify does not receive requests for each ordinary page open.
    if(url.origin===self.location.origin)return cacheFirst(event.request);
    // WebLLM may request files from additional hosts. Never duplicate gigantic models in SW cache.
    // Its own AI cache handles model data; retain established esm.run fallback behavior.
    if(url.hostname==='esm.run')return cacheFirst(event.request);
    return fetch(event.request);
  })());
});
