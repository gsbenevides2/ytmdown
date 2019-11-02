const express  = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const downloader =  require("./downloader.js")
app.use(express.static("public"))
app.get("/urlYoutube",async (req,res)=>{
				const url = req.query.url
				if(!url) return res.send({
								urlIsValid:false,
								errorMessage:"Insira uma url!"
				})
				const id = downloader.returnIdFromUrl(url)
				if(!id) return res.send({
								urlIsValid:false,
								errorMessage:"Insira uma url do Youtube!"
				})
				const response = await downloader.getVideoData(id)
				res.send(response)
})
io.on("connection",client=>{
				client.on("download",async musicData=>await downloader.download(musicData,client))
})
http.listen(3000,()=>{
				console.log("Ativado")
})

