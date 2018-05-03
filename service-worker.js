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
    "url": "app.bundle.389752edc06502be3e3a.css",
    "revision": "0bf54ae174533a38b1526b1ed153a05f"
  },
  {
    "url": "app.bundle.389752edc06502be3e3a.js",
    "revision": "9b2cdcc0589e109499d41c0a54ffd12d"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "ca07e2ed11823a7f59b24154d3345c12"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
