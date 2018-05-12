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
    "url": "app.bundle.a3e1af9d104a7fdd247d.css",
    "revision": "a8504cc24b97640ff9fa060f595b374e"
  },
  {
    "url": "app.bundle.a3e1af9d104a7fdd247d.js",
    "revision": "61c0d192d90d04287394964cfdde020c"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "0991febce6ce5a872721ee6a03fb72ac"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
