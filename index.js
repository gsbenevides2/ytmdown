const express  = require("express")
const app = express()
const caramelPuppy = require("caramel-puppy")({
 __filename,
 express:app
})
caramelPuppy.appStart()
const http = require("http").Server(app)
const io = require("socket.io")(http)

const {
 getVideoId,
 generateSearchTerm
} = require("./getVideoInfo")
const {
 searchMusic,
 getMusic
} = require("./getMusicInfo")

app.use(express.static("public"))
app.disable('etag')

app.get("/album",async (req,res)=>{
 const url = req.query.url
 caramelPuppy.log("Url:",url)
 const id = await getVideoId(url)
	.catch(e=>{res.status(400).send(e)})
 caramelPuppy.log("Id:",id)
 if(id){
	const searchTerm = await generateSearchTerm(id)
	 .catch(e=>{res.status(400).send(e)})
	caramelPuppy.log("SearchTerm:",searchTerm)
	if(searchTerm){
	 const results = await searchMusic(searchTerm)
		.catch(e=>{res.status(400).send(e)})
	 caramelPuppy.log("Results:",results)
	 res.send({
		idOfVideo:id,
		searchTerm,
		albumResults:results
	 })
	}
 }
})
app.get("/music/",(req,res)=>{
 const {id} = req.query
 caramelPuppy.log("Id",id)
 getMusic(id)
	.then(result=>{
	 caramelPuppy.log("Result",result)
	 res.send(result)
	})
	.catch(e=>{res.status(400).send(e)})
})
app.get("/music/:id.mp3",(req,res)=>{
 res.sendFile(`${__dirname}/music/${req.params.id}.mp3`)
})
app.get("/clean",(req,res)=>{
})

io.on("connection",client=>{
 client.on("download",async musicData=>await downloader.download(musicData,client))
})

http.listen(process.env.PORT || 3000, ()=>{
 caramelPuppy.log("Ativado http")
 caramelPuppy.log("Porta usada",process.env.PORT || 3000)
})

