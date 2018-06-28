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
    "url": "app.bundle.2b7110a32a388d0f2808.css",
    "revision": "cbff0bb9c8e33b5efd2b3612cd52a660"
  },
  {
    "url": "app.bundle.2b7110a32a388d0f2808.js",
    "revision": "bc08c19b1f636f4c6446939fdf25dcfc"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "862554b26e05359d279a128e40df7bf9"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
