const express  = require("express")
const app = express()
const cors = require('cors')

const whitelist = [
'http://localhost:3000',
'http://localhost:5000',
'https://ytmdown.web.app/',
'https://ytmdown.firebaseapp.com',
'https://ytmdown.herokuapp.com',
 undefined
]
const corsOptions = {
 origin: function (origin, callback) {
	console.log(origin)
	if (whitelist.indexOf(origin) !== -1) {
	 callback(null, true)
	} else {
	 callback(new Error('Not allowed by CORS'))
	}
 }
}
app.use(cors(corsOptions))
const caramelPuppy = require("caramel-puppy")({
 __filename,
 express:app
})
caramelPuppy.appStart()
const http = require("http").Server(app)
const io = require("socket.io")(http)
io.origins(whitelist)
const routes = require("./routes")
const {
 DownloaderMusic,
 getMusicFile
}= require("./musicDownloader")
app.use(routes)
app.disable('etag')
app.get("/",(request,response)=>{
 response.status(301).set('Location','https://ytmdown.web.app').send()
})
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

