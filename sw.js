const CACHE='kotoba-writer-shell-v3';
const PRIVACY_FLAG='kotoba-writer-privacy-lock-v1';
const SHELL=['./','./index.html','./manifest.webmanifest'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));
});

self.addEventListener('activate',e=>{
  e.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k.startsWith('kotoba-writer-shell-')&&k!==CACHE).map(k=>caches.delete(k))
    ))
  ]));
});

self.addEventListener('message',event=>{
  const data=event.data||{};
  if(data.type!=='SET_OFFLINE_ONLY')return;
  event.waitUntil((async()=>{
    if(data.enabled){
      await caches.open(PRIVACY_FLAG);
    }else{
      await caches.delete(PRIVACY_FLAG);
    }
  })());
});

async function isPrivacyLocked(){
  return await caches.has(PRIVACY_FLAG);
}

async function cacheOnly(req){
  const hit=await caches.match(req);
  if(hit)return hit;
  return new Response('Blocked by Kotoba Writer privacy mode.',{
    status:503,
    statusText:'Privacy mode blocked network'
  });
}

async function networkFirst(req){
  try{
    const r=await fetch(req,{cache:'no-store'});
    if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
    return r;
  }catch(e){
    const hit=await caches.match(req);
    if(hit)return hit;
    throw e;
  }
}

async function cacheFirst(req){
  const hit=await caches.match(req);
  if(hit)return hit;
  const r=await fetch(req);
  if(r&&r.ok)caches.open(CACHE).then(c=>c.put(req,r.clone())).catch(()=>{});
  return r;
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;

  event.respondWith((async()=>{
    const locked=await isPrivacyLocked();
    if(locked){
      // In privacy mode every controlled GET is cache-only.
      // No fallback to the network is permitted.
      return await cacheOnly(event.request);
    }

    const u=new URL(event.request.url);
    if(u.origin===self.location.origin){
      return await networkFirst(event.request);
    }

    if(u.hostname==='esm.run'){
      return await cacheFirst(event.request);
    }

    // Other resources (including AI model files) are available to WebLLM
    // during preparation. Once privacy mode is enabled, this path is blocked.
    return await fetch(event.request);
  })());
});
