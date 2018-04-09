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
    "url": "app.bundle.fd5ed939aa325c7f6de6.css",
    "revision": "6df25f9975b1272cb1a7e1213fc5b813"
  },
  {
    "url": "app.bundle.fd5ed939aa325c7f6de6.js",
    "revision": "c5e64c843142c37fa1dccd28483e0fb3"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "52147dbea89bc27e2a6a7f28e52d2806"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
