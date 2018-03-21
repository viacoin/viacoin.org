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
    "url": "app.bundle.8718ae25bb57b73793bb.css",
    "revision": "efe91990ba3e788d2a035813735131e0"
  },
  {
    "url": "app.bundle.8718ae25bb57b73793bb.js",
    "revision": "42cb9e80f21d9b7f7a9e289e6a55f312"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "5084ed49e54235884698ff376030aaed"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
