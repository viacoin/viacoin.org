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
    "url": "app.bundle.fca94ff6e2cea96fc609.css",
    "revision": "a8504cc24b97640ff9fa060f595b374e"
  },
  {
    "url": "app.bundle.fca94ff6e2cea96fc609.js",
    "revision": "274e61c1df235f517d9baeb143bc9ad6"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "c4b765bf7520e2c52a5829e9a2ba7c32"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
