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
    "url": "app.bundle.c56cdcc954f44ae18452.css",
    "revision": "86838da15d6ad96d4bdc36b3c628f9b3"
  },
  {
    "url": "app.bundle.c56cdcc954f44ae18452.js",
    "revision": "aa8f0b5083bcd100c50f82883bd640e0"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "14fdf10974d6b39b6b88e68b9500e010"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
