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
    "url": "app.bundle.eaccd59e186ec90ef986.css",
    "revision": "2427d742eab930946c7c68d80c1801c7"
  },
  {
    "url": "app.bundle.eaccd59e186ec90ef986.js",
    "revision": "e002d8b3dc9baf79679d2eaf12cac907"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "21c3cdd6723558f09f4324e8d0985758"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
