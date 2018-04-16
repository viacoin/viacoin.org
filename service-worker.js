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
    "url": "app.bundle.6d0ffae5b78d4953038e.css",
    "revision": "a7d453c3fb5733470fbd3261372ef85c"
  },
  {
    "url": "app.bundle.6d0ffae5b78d4953038e.js",
    "revision": "37209693a09c520eb109765754d278e2"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "b8335d99824fdd9cbf3ddd017368001d"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
