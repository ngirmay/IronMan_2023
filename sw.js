// Service Worker for Ironman 2023 Project
const CACHE_NAME = 'ironman-2023-v1';
const urlsToCache = [
    '/',
    '/index_optimized.html',
    '/css/optimized-styles.css',
    '/js/lazy-loader.js',
    '/course_maps/IM24_LP_CourseMap_Swim_081423_cc-1_large.webp',
    '/course_maps/IM24_LP_CourseMap_Bike_081423_cc-1_large.webp',
    '/course_maps/IM24_LP_CourseMap_Run_081423_cc-1_large.webp'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch events
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache HTML and CSS files
                    if (event.request.url.includes('.html') || 
                        event.request.url.includes('.css') ||
                        event.request.url.includes('.js')) {
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                    }

                    return response;
                });
            })
    );
});

// Activate and clean old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});