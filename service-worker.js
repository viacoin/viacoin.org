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
    "url": "app.bundle.575d49f42e5ef984b313.css",
    "revision": "bd49eb1b94fb7b38c8122f74fdae93ea"
  },
  {
    "url": "app.bundle.575d49f42e5ef984b313.js",
    "revision": "e39c97673b54c4590fc53fe757afbdaa"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "7778c5f7784a27f0d872be6abf42da0e"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
