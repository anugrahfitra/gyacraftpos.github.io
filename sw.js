const CACHE_NAME = 'gya-craft-pos-v1';
const APP_FILES = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// CDN dependencies used by the existing interface.
// They are downloaded once during installation and then served from Cache Storage.
// Opaque responses are intentionally accepted because these are public static assets.
const CDN_FILES = [
  'https://cdn.tailwindcss.com/',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES);

    // A CDN failure must not prevent the local POS shell from installing.
    await Promise.allSettled(CDN_FILES.map(async url => {
      const request = new Request(url, { mode: 'no-cors', cache: 'reload' });
      const response = await fetch(request);
      if (response && (response.ok || response.type === 'opaque')) {
        await cache.put(request, response);
      }
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('gya-craft-pos-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && (response.ok || response.type === 'opaque')) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        return (await caches.match('./index.html')) || new Response('Aplikasi belum tersimpan offline. Buka saat online terlebih dahulu.', {
          status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
      return new Response('', { status: 503, statusText: 'Offline asset unavailable' });
    }
  })());
});
