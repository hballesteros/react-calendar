import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
  } from "workbox-precaching";
  
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
  
cleanupOutdatedCaches();
  
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);
  
// to allow work offline
registerRoute(
    new NavigationRoute(createHandlerBoundToURL("index.html"), {
      denylist: [/^\/backoffice/],
    })
);
  
self.skipWaiting();
  
clientsClaim();
  
self.addEventListener('install', async (event) => {
    const cache = await caches.open("cache-1");

    await cache.addAll([
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
        '/favicon.ico'
    ]);
});

const apiOfflineFallbacks = [
    'http://192.168.0.107:4000/api/auth/renew',
    'http://192.168.0.107:4000/api/events'
];

// Estrategia Cache with Network Fallback
self.addEventListener('fetch', (event) => {

    //if ( event.request.url !== 'http://192.168.0.107:4000/api/auth/renew' ) return;
    if ( !apiOfflineFallbacks.includes( event.request.url ) ) return;

    const resp = fetch( event.request )
        .then( response => {

            if ( !response ) return caches.match( event.request );

            // Guardar en cache la respuesta
            caches.open('cache-dynamic').then( cache => {
                cache.put( event.request, response );
            });

            return response.clone();
        })
        .catch( err => {
            console.log('Error en petición fetch', err );
            return caches.match( event.request );
        });

     event.respondWith( resp );

});