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
    "url": "app.bundle.3ba3e33934ad27ab878f.css",
    "revision": "d75b44a89dd0c852f393bfb929e97cb3"
  },
  {
    "url": "app.bundle.3ba3e33934ad27ab878f.js",
    "revision": "abe1a5a7007481eab3555210a23f3460"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "c0e089e4dc7c44cbf80282a6751860eb"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
