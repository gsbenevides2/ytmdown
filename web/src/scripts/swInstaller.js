if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
	navigator.serviceWorker.register('/sw.js')
	 .then(regist=>firebase.messaging().useServiceWorker(regist))
 });
}

