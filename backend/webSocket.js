const caramelPuppy = require('caramel-puppy')({__filename})
const {DownloaderMusic}= require("./musicDownloader")

module.exports = socket=>{
 const id = socket.id
 socket.on("downloadMusic",async musicData=>{
	function eventReceiver(event){
	 caramelPuppy.log(event)
	 socket.emit("event",event)
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
