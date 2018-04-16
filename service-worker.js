importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "app.bundle.a80fcd84f8a9e4bb624b.css",
    "revision": "a72aaa96199dd5829b6df7585244ece1"
  },
  {
    "url": "app.bundle.a80fcd84f8a9e4bb624b.js",
    "revision": "3c0451397cd6a85858add396f7a4c9d1"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "3d1f6e31a65f277088e5a60380944de7"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
