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
    "url": "app.bundle.0db5769be3830a3d7069.css",
    "revision": "24064255ebb39e15927dade620d88a7c"
  },
  {
    "url": "app.bundle.0db5769be3830a3d7069.js",
    "revision": "87139a850dd3de9fe9830afc04ce5cff"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "f7d6abf7258f804f2909c16c236e40d0"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
