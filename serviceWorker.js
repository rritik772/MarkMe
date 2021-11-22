var CACHE_NAME = 'PWA_MARK_ME';
var urls_to_cache = [
  '/',
  '/dashboard',
  '/login',
  '/signUp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Cache opened');
            return cache.addAll(urls_to_cache);
          })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
          .then(response => {
            if (response) return response;
            return fetch(event.request);
          })
  );
});

self.addEventListener('activate', event => {
  var cacheWhiteList = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                if ( cacheWhiteList.indexOf(cacheName) === -1 )
                  return caches.delete(cacheName);
              })
            )
          })
  );
});
