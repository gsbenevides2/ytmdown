const caramelPuppy = require('caramel-puppy')({__filename})
const admin = require("firebase-admin");
const {DownloaderMusic}= require("./musicDownloader")

const serviceAccount = process.env.GOOGLE_ADMIN;
admin.initializeApp({
 credential: admin.credential.cert(JSON.parse(serviceAccount)),
 databaseURL: "https://ytmdown.firebaseio.com"
});


module.exports = socket=>{
 const id = socket.id
 socket.on("downloadMusic",async data=>{
	const {musicData,authToken} = data
	caramelPuppy.log(data)
	function eventReceiver(event){
	 caramelPuppy.log(event)
	 socket.emit("event",event)
	}
	if(authToken){
	 admin.auth().verifyIdToken(authToken,true)
		.then(user=>{
		 admin.firestore().collection(`users/${user.uid}/history`).add(musicData)
			.then(()=>caramelPuppy.log('Save in history'))
		 .catch(console.error)
		})
	 .catch(console.error)
	}
	const downloader = new DownloaderMusic(musicData,id,eventReceiver)
	downloader.downloadMusic().then(()=>{
	 downloader.downloadCapa().then(()=>{
		downloader.setId3().then(()=>{
		 eventReceiver({
			type:"Success",
			id
		 })
		})
	 })
	})
 })
}
