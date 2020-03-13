if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
	if(window.location.hostname !== "localhost"){
	 navigator.serviceWorker.register('/sw.js');
	}
 });
}

