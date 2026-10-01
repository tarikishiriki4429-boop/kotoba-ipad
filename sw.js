const CACHE='kotoba-shell-v5';
const SHELL=['./','./index.html','./manifest.webmanifest'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(SHELL))
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then(keys=>Promise.all(
        keys.filter(k=>k.startsWith('kotoba-shell-')&&k!==CACHE).map(k=>caches.delete(k))
      ))
    ])
  );
});

async function networkFirst(request){
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response && response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
    }
    return response;
  }catch(err){
    const hit=await caches.match(request);
    if(hit) return hit;
    throw err;
  }
}

async function cacheFirst(request){
  const hit=await caches.match(request);
  if(hit) return hit;
  const response=await fetch(request);
  if(response && response.ok){
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});
  }
  return response;
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);

  // GitHub Pages上のHTML/manifestはオンライン時に必ず最新版を優先。
  if(url.origin===self.location.origin){
    event.respondWith(networkFirst(event.request));
    return;
  }

  // AIライブラリはオフライン再利用を優先。
  if(url.hostname==='esm.run'){
    event.respondWith(cacheFirst(event.request));
  }
});
