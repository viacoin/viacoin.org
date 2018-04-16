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
    "url": "app.bundle.7599fcb05330fd084d07.css",
    "revision": "a7d453c3fb5733470fbd3261372ef85c"
  },
  {
    "url": "app.bundle.7599fcb05330fd084d07.js",
    "revision": "e07f1f6338d59de8588bc1966883aa6c"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "e1eb29b4a8036af1dccdbd0ca6b4ee2c"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
