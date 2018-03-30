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
    "url": "app.bundle.8e893a8434be7cb9441e.css",
    "revision": "fa0e03cf9b80bdb1c8063c4a62df6a23"
  },
  {
    "url": "app.bundle.8e893a8434be7cb9441e.js",
    "revision": "48557889f075b52323bb65e99444f483"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "35051856ee1ceb46d9b282f9f111fbc5"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
