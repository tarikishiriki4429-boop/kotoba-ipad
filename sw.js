const CACHE='kotoba-writer-shell-v1';
const SHELL=['./','./index.html','./manifest.webmanifest'];
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
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===self.location.origin){e.respondWith(networkFirst(e.request));return}
  if(u.hostname==='esm.run'){e.respondWith(cacheFirst(e.request))}
});
