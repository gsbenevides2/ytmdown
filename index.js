const express  = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const rmrf = require("rimraf")
const fs = require("fs")
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
app.get("/music/:id.mp3",(req,res)=>{
 res.sendFile(`${__dirname}/music/${req.params.id}.mp3`)
})
app.get("/clean",(req,res)=>{
 res.send()
 rmrf.sync(`${__dirname}/music`)
 rmrf.sync(`${__dirname}/images`)
 fs.mkdirSync("images")
 fs.mkdirSync("music")
})
http.listen(process.env.PORT || 3000, (ip,port)=>{
				console.log(ip)
				console.log("Ativado")
})

