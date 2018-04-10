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
    "url": "app.bundle.47776f60b9a242f430a9.css",
    "revision": "a2a25d14a80b9cf508718e62a93b47bd"
  },
  {
    "url": "app.bundle.47776f60b9a242f430a9.js",
    "revision": "ba0e469848e778d048a8e5faf3860e39"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "c2d9471dbbaafc51084ba90fe6186b3f"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
