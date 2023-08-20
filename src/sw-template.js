importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events'
]

registerRoute(
    ({ request, url }) => {
        // console.log(request, url);
        if ( cacheNetworkFirst.includes(url.pathname) ) return true;
        return false;
    },
    new NetworkFirst()
);

// Referencia
// registerRoute(
//     new RegExp('http://192.168.0.107:4000/api/auth/renew'),
//     new NetworkFirst()
// );

const cacheFirstNetwork = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
]

registerRoute(
    ({ request, url }) => {
        // console.log(request, url);
        if ( cacheFirstNetwork.includes(url.href) ) return true;
        return false;
    },
    new CacheFirst()
);

// Posteos Offline
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    new RegExp('http://192.168.0.107:4000/api/events'),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'POST'
);

registerRoute(
    new RegExp('http://192.168.0.107:4000/api/events/.+'),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'PUT'
);

registerRoute(
    new RegExp('http://192.168.0.107:4000/api/events/.+'),
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'DELETE'
);