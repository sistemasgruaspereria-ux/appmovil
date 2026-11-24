// ==========================================
// SERVICE WORKER — PORTAL DE OPERARIOS (AYAX - GRÚAS PEREIRA)
// ==========================================
const CACHE_NAME = 'ayax-gruas-cache-v19'; // <-- Cambia este número cada vez que actualices la app
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './isologo.png'
];

// Instalación: guarda los archivos estáticos en la nueva caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación: elimina cachés antiguas que no coincidan con CACHE_NAME
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((oldName) => caches.delete(oldName))
      );
    })
  );
  self.clients.claim();
});

// Interceptación de peticiones: Network First para archivos estáticos, sin caché en /api/
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === 'basic'
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});



