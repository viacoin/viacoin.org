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
    "url": "app.bundle.64065874ec7d87d96275.css",
    "revision": "c58e990f188247311a07f9b33fb5c785"
  },
  {
    "url": "app.bundle.64065874ec7d87d96275.js",
    "revision": "2a040f4a5a0d7bffd2e15b0bf3394af0"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "4a6adf93704a9dd31e230eea0ae2ba8f"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
