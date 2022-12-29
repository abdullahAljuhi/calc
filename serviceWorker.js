const assets = [
  "/",
  "/index.html",
  // '/manifest.json',
  // '/serviceWorker.js',
  '/css/style.css',
  '/js/app.js',
  '/js/calc.js',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-48x48.png',

]
const cacheName='calc-v'
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(//
  // انتظر الا ان تخلص
    // open cache
    caches.open(cacheName)
    .then(cache => {
      cache.addAll(assets) // add to cache
    })
    .catch( err => console.error("هناك حطا في تحميل الملفات"))
  )
})

self.addEventListener("activate", (activeteEvent) => {
  caches.keys().then((key) => {
    console.log(key)
  })
  // console.log('activete ')

})

self.addEventListener("fetch", fetchEvent => {
  // this will run when any reguest in page like image
  // or css style or js failes and others request
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )  
    
  })