const caramelPuppy = require('caramel-puppy')({__filename})
const admin = require("firebase-admin");
const {DownloaderMusic}= require("./musicDownloader")

const {
 PROJECT_ID,
 PRIVATE_KEY_ID,
 PRIVATE_KEY,
 CLIENT_EMAIL,
 CLIENT_ID,
} = process.env;

admin.initializeApp({
 credential: 
 admin.credential.cert({
	type:'service_account',
	client_id:CLIENT_ID,
	project_id:PROJECT_ID,
	client_email:CLIENT_EMAIL,
	private_key_id:PRIVATE_KEY_ID,	
	private_key:`-----BEGIN PRIVATE KEY-----\n${PRIVATE_KEY.replace(/\\n/g, '\n')}\n-----END PRIVATE KEY-----\n
`,
	client_x509_cert_url:'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-w42xw%40ytmdown.iam.gserviceaccount.com'
 }),
 databaseURL: `https://${PROJECT_ID}.firebaseio.com`
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
		 if(data.messagingToken){
			admin.messaging().send({
			 webpush:{
				notification:{
				title:'Donwload Concluido',
				 icon:'/icons/icon-128x128.png',
				 click_action:`/down?id=${id}`
				}
			 },
			 token:data.messagingToken
			})
			caramelPuppy.log('Sending Message')
		 }
		})
	 })
	})
 })
}
