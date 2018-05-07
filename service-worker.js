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
    "url": "app.bundle.d8b9e551705d08050583.css",
    "revision": "b5b90026f918992ad487612dc6e128ef"
  },
  {
    "url": "app.bundle.d8b9e551705d08050583.js",
    "revision": "aae2f07f695e053790db57d6cc61a18f"
  },
  {
    "url": "fonts.css",
    "revision": "329dd04b3b38ff48c9688b7b4942138d"
  },
  {
    "url": "index.html",
    "revision": "7bcd8f27f43ecba216e6911737c5c53d"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
