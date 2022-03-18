var APP_PREFIX = 'D2-VotD-Symbol_' // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01' // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [ // Add URL you want to cache in this list.
    './', // alias for index.html
    './index.html',
    './style.css', // stylesheet
    './manifest.webmanifest', // manifest
    // Assets
    './img/200px/neutral.png', 
    './img/200px/ascendant_plane.png', 
    './img/200px/black_fleet.png', 
    './img/200px/black_garden.png', 
    './img/200px/black_heart.png', 
    './img/200px/commune.png', 
    './img/200px/darkness.png', 
    './img/200px/drink.png', 
    './img/200px/earth.png', 
    './img/200px/enter.png', 
    './img/200px/give.png', 
    './img/200px/grief.png', 
    './img/200px/guardian.png', 
    './img/200px/hive.png', 
    './img/200px/kill.png', 
    './img/200px/knowledge.png', 
    './img/200px/light.png', 
    './img/200px/love.png', 
    './img/200px/pyramid.png', 
    './img/200px/savathun.png', 
    './img/200px/scorn.png', 
    './img/200px/stop.png', 
    './img/200px/tower.png', 
    './img/200px/traveler.png', 
    './img/200px/witness.png', 
    './img/200px/worm.png', 
    './img/200px/worship.png',
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url)
                return request
            } else { // if there are no cache, try fetching request
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request)
        })
    )
})

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(URLS)
        })
    )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            // `keyList` contains all cache names under your username.github.io
            // filter out ones that has this app prefix to create white list
            var cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX)
            })
            // add current cache name to white list
            cacheWhitelist.push(CACHE_NAME)

            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i])
                    return caches.delete(keyList[i])
                }
            }))
        })
    )
})