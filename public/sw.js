/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "ffd5f10138b4d69765bc03a43e6f70f9"
  },
  {
    "url": "libraes/mdc.css",
    "revision": "7da48c001f8021391bbcdd9e38605247"
  },
  {
    "url": "libraes/vue.js",
    "revision": "17e942ea0854bd9dce2070bae6826937"
  },
  {
    "url": "scripts/albumScreen.js",
    "revision": "4ff9db62a8ddedd7169e04e144526609"
  },
  {
    "url": "scripts/albumsScreen.js",
    "revision": "b3eeb074b378670beddabec813e2f2dd"
  },
  {
    "url": "scripts/fab.js",
    "revision": "2819b683adf6c547861c76cfe143b687"
  },
  {
    "url": "scripts/firebaseStart.js",
    "revision": "3cb3940ff2f15bab2c0982210efca6fc"
  },
  {
    "url": "scripts/loadingScreen.js",
    "revision": "6f486363460644aee7257a9c732c48eb"
  },
  {
    "url": "scripts/lyricsScreen.js",
    "revision": "7d7ffa0998538f019c3d859cfbe2395d"
  },
  {
    "url": "scripts/progressBar.js",
    "revision": "db4b845355040188684ae1023feee3df"
  },
  {
    "url": "scripts/topAppBar.js",
    "revision": "1ff5701e4303980297beea96bdcba7cf"
  },
  {
    "url": "scripts/urlScreen.js",
    "revision": "cc6cf20119eb617b3e561268d329813a"
  },
  {
    "url": "styles/darkMode.css",
    "revision": "8d8054e8ef9794cfe72ce20587bb42c2"
  },
  {
    "url": "styles/style.css",
    "revision": "7eaefad9e78d7c0b94d646bb846ffc0b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
