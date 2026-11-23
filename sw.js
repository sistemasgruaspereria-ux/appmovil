// ==========================================
// SERVICE WORKER — PORTAL DE OPERARIOS (AYAX - GRÚAS PEREIRA)
// ==========================================
const CACHE_NAME = 'ayax-gruas-cache-v11'; // <-- Cambia este número cada vez que actualices la app

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './logo.png'
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

// Interceptación de peticiones: responde desde caché si está disponible o va a red
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => cachedResponse);
    })
  );
});

