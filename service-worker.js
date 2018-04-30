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
    "url": "app.bundle.bab9731f24101b7d1af9.css",
    "revision": "f4347b06a1334b554451869cb1210f6c"
  },
  {
    "url": "app.bundle.bab9731f24101b7d1af9.js",
    "revision": "6bbb74eb3334194154ff343038afc357"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "f2c5b14e780adb85acff68a559f81bf7"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
