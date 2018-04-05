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
    "url": "app.bundle.d54ba0c8b71196206152.css",
    "revision": "0283ac3940689af700aa1cbc0f387347"
  },
  {
    "url": "app.bundle.d54ba0c8b71196206152.js",
    "revision": "3fba51d3bf64bf6dd012a68bf03a974e"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "f47d20501e9e41eb080cb3702e413002"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
