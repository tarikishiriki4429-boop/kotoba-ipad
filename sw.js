const CACHE = 'kotoba-shell-v4';
const SHELL = ['./', './index.html', './manifest.webmanifest'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith('kotoba-shell-') && key !== CACHE)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    // no-store を指定して Safari の古い HTTP キャッシュも避ける。
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;

  // ページ本体はオンライン時に必ず最新版を確認する。
  if (
    sameOrigin &&
    (event.request.mode === 'navigate' ||
      url.pathname.endsWith('/index.html') ||
      url.pathname.endsWith('/manifest.webmanifest'))
  ) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // WebLLM の読み込み用。取得済みならオフラインでも使える。
  if (
    url.hostname === 'esm.run' ||
    url.hostname === 'cdn.jsdelivr.net' ||
    url.hostname.endsWith('.jsdelivr.net')
  ) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  if (sameOrigin) {
    event.respondWith(networkFirst(event.request));
  }
});
