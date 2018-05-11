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
    "url": "app.bundle.23546eac028a7b8d8d8e.css",
    "revision": "a8504cc24b97640ff9fa060f595b374e"
  },
  {
    "url": "app.bundle.23546eac028a7b8d8d8e.js",
    "revision": "fe5e543a99bbc60be8427ecd1c3aa351"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "75c9bc9179a1c98924710b5de22419ed"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
