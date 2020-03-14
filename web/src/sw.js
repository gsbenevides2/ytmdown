importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("/__/firebase/7.9.1/firebase-app.js")
importScripts("/__/firebase/7.9.1/firebase-messaging.js")
importScripts("/__/firebase/init.js")
const messaging = firebase.messaging();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.__precacheManifest = [
{"url":"libraes/mdc.min.css","revision":"3.0.2"},
/*{"url":"styles/darkMode.css","revision":"3.0.2"},
{"url":"styles/style.css","revision":"3.0.2"},
{"url":"libraes/axios.min.js","revision":"3.0.2"},
{"url":"libraes/lottie-player.js","revision":"3.0.2"},
{"url":"libraes/material-components-web.min.js","revision":"3.0.2"},
{"url":"libraes/socket.io.js","revision":"3.0.2"},
{"url":"libraes/vue.js","revision":"3.0.2"},
{"url":"scripts/components/fab.js","revision":"3.0.2"},
{"url":"scripts/components/lyricsView.js","revision":"3.0.2"},
{"url":"scripts/components/menu.js","revision":"3.0.2"},
{"url":"scripts/components/progressBar.js","revision":"3.0.2"},
{"url":"scripts/components/snackbar.js","revision":"3.0.2"},
{"url":"scripts/components/topAppBar.js","revision":"3.0.2"},
{"url":"scripts/eruda.js","revision":"3.0.2"},
{"url":"scripts/makeApi.js","revision":"3.0.2"},
{"url":"scripts/metrics.js","revision":"3.0.2"},
{"url":"scripts/screens/album.js","revision":"3.0.2"},
{"url":"scripts/screens/albums.js","revision":"3.0.2"},
{"url":"scripts/screens/history/main.js","revision":"3.0.2"},
{"url":"scripts/screens/history/music.js","revision":"3.0.2"},
{"url":"scripts/screens/loading.js","revision":"3.0.2"},
{"url":"scripts/screens/login.js","revision":"3.0.2"},
{"url":"scripts/screens/lyrics.js","revision":"3.0.2"},
{"url":"scripts/screens/settings.js","revision":"3.0.2"},
{"url":"scripts/screens/url.js","revision":"3.0.2"},
{"url":"scripts/swInstaller.js","revision":"3.0.2"},
{"url":"sw.js","revision":"3.0.2"},
{"url":"about","revision":"3.0.2"},
{"url":"google1d6030f53a0983b0","revision":"3.0.2"},
{"url":"history","revision":"3.0.2"},
{"url":"/","revision":"3.0.2"},
{"url":"login","revision":"3.0.2"},
{"url":"settings","revision":"3.0.2"}*/].concat(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
