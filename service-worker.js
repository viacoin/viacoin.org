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
    "url": "app.bundle.d292898cfa598a9fce54.css",
    "revision": "6521b9d8c2f597232f887fbb36aa70c4"
  },
  {
    "url": "app.bundle.d292898cfa598a9fce54.js",
    "revision": "d308f34ef963ff9f7afffc1a6ce3bc54"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "10373b16c8febced3e609e9f391376df"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
