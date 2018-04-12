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
    "url": "app.bundle.952c77e18d25085ade9b.css",
    "revision": "4cb8c26caa608f5c5b1162fb9bc25f51"
  },
  {
    "url": "app.bundle.952c77e18d25085ade9b.js",
    "revision": "84b156651e89865fd8e9ed0ad628a6b6"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "e8330a845fe77ffdbc574cc7111bbf65"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
