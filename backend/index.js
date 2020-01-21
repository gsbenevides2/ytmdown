const express  = require("express")
const app = express()
const caramelPuppy = require("caramel-puppy")({
 __filename,
 express:app
})
caramelPuppy.appStart()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const routes = require("./routes")
const {
 DownloaderMusic,
 getMusicFile
}= require("./musicDownloader")
app.use(routes)
app.use(express.static("backend/public"))
app.disable('etag')
app.get("/music/:id.mp3",
 (request,response)=>{
	const {id} = request.params
	const stream = getMusicFile(id)
	response.sendFile(stream.path)
 }
)
io.on("connection",socket=>{
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
})

http.listen(process.env.PORT || 3000, ()=>{
 caramelPuppy.log("Ativado http")
 caramelPuppy.log("Porta usada",process.env.PORT || 3000)
})

