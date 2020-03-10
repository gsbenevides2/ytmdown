const caramelPuppy = require('caramel-puppy')({__filename})
const admin = require("firebase-admin");
const {DownloaderMusic}= require("./musicDownloader")

const {
 project_id,
 private_key_id,
 private_key,
 client_email,
 client_id,
} = process.env;

admin.initializeApp({
 credential: 
 admin.credential.cert({
	type:'service_account',
	client_id,
	project_id,
	client_email,
	private_key_id,	
	private_key:private_key.replace(/\\n/g, '\n'),
	client_x509_cert_url:'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w42xw%40ytmdown.iam.gserviceaccount.com'
 }),
 databaseURL: `https://${project_id}.firebaseio.com`
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
	if(authToken&& musicData.saveHistory!== false){
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
