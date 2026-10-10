const CACHE='kotoba-writer-shell-v30';
const PRIVACY_FLAG='kotoba-writer-privacy-lock-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./licenses.html','./ai-worker.js?v=30'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));
});
self.addEventListener('activate',e=>{
  e.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kotoba-writer-shell-')&&k!==CACHE).map(k=>caches.delete(k))))
  ]));
});
self.addEventListener('message',event=>{
  const d=event.data||{};
  if(d.type!=='SET_OFFLINE_ONLY')return;
  event.waitUntil(d.enabled?caches.open(PRIVACY_FLAG):caches.delete(PRIVACY_FLAG));
});
async function locked(){return await caches.has(PRIVACY_FLAG)}
async function cacheOnly(req){
  const hit=await caches.match(req);
  if(hit)return hit;
  return new Response('Blocked by privacy mode',{status:503});
}
async function networkFirst(req){
  try{
    const r=await fetch(req,{cache:'no-store'});
    if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
    return r;
  }catch(e){
    const hit=await caches.match(req);if(hit)return hit;throw e;
  }
}
async function cacheFirst(req){
  const hit=await caches.match(req);if(hit)return hit;
  const r=await fetch(req);
  if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
  return r;
}
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith((async()=>{
    if(await locked())return await cacheOnly(event.request);
    const u=new URL(event.request.url);
    if(u.origin===self.location.origin)return await networkFirst(event.request);
    if(u.hostname==='esm.run')return await cacheFirst(event.request);
    return await fetch(event.request);
  })());
});
