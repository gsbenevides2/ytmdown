const os = require("os")
const NodeID3 = require('node-id3')
const solenolyrics= require("solenolyrics");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require("fs")
const request = require("request")
require('dotenv').config()

if (!fs.existsSync("music")){
 fs.mkdirSync("music");
}
if(!fs.existsSync("images")){
 fs.mkdirSync("images")
}
let ffmpegPath
switch(os.platform()){
 case "android":
	ffmpegPath = "/data/data/com.termux/files/usr/bin/ffmpeg"
	break
 default:
	ffmpegPath ="/app/vendor/ffmpeg/ffmpeg"
}
const YDSettings= {
 ffmpegPath,
 outputPath:`${__dirname}/music`,
 queueParallelism:2,
 progressTimeout:2000
}
const youtubeAPI = request.defaults({
 baseUrl:"https://www.googleapis.com/youtube/v3",
 qs:{key:process.env.GOOGLEAPI},
 json:true
})
const deezerAPI = request.defaults({
 baseUrl: "https://api.deezer.com",
 json:true
})
const yandexAPI = request.defaults({
 baseUrl:"https://translate.yandex.net/api/v1.5",
 qs:{key:process.env.YANDEX},
 json:true
})
async function requestAsyncGet(options,api){
 return new Promise(resolve=>{
	if(api) api.get(options,(err,req,body)=>resolve({err,req,body}))
	else request.get(options,resolve)
 })
}
async function nullPromise(){
 return new Promise(resolve=>{resolve(null)})
}
module.exports = {
 returnIdFromUrl(urlString){
	try{
	 const url = new URL(urlString)
	 const urlType1Hosts = [
		"music.youtube.com",
		"youtube.com"
	 ]
	 if(urlType1Hosts.includes(url.host)){
		const v = url.searchParams.get("v")
		return v
	 }
	 else return false
	}catch(e){
	 return false
	}
 },
 getVideoData(id){
	return new Promise(resolve=>{
	 let search
	 const response = {
		urlIsValid:null,
		musicData:{id}
	 }

	 requestAsyncGet({
		url:"/videos",
		qs:{id,part:"snippet"}
	 },youtubeAPI)
		.then(data=>{
		 const {body}= data
		 const description = body.items[0].snippet.description
		 response.urlIsValid = true
		 const lines = description.split("\n")
		 const line = lines[2].split(" · ")
		 response.musicData.album= lines[4];
		 [response.musicData.name, ...response.musicData.artists ]= line
		 search = `${line.join(",")},${response.musicData.album}`
		 response.musicData.artists.map((artist,index)=>{
			if(artist.indexOf(" / ") !== -1){
			 const types = artist.split(" / ")
			 types.map(type=>{
				if(type.indexOf("en - ")!==1){
				 response.musicData.artists[index] = type.slice(4)
				}
			 })
			}
		 })
		 return solenolyrics.requestLyricsFor(`${response.musicData.name},${response.musicData.artists.join(" ")}`)
		})
		.then(lyrics=>{
		 if(lyrics){
			response.musicData.lyrics = lyrics
			return requestAsyncGet({
			 url:"/tr.json/detect",
			 qs:{
				text:lyrics
			 }
			},yandexAPI)
		 }else{
			 return nullPromise()
			}
		 })
		.then(data=>{
		 if(data){
			const lang = data.body.lang
			return requestAsyncGet({
			 url:"/tr.json/translate",
			 qs:{
				text:response.musicData.lyrics,
				lang:`${lang}-pt`
			 }
			},yandexAPI)
		 }
		 else{
			return nullPromise()
		 }
		})
		.then(data=>{
		 if(data){
			response.musicData.traslation = data.body.text.join("")
		 }
		 return requestAsyncGet({
			url:"/search",
			qs:{
			 q:search
			}
		 },deezerAPI)
		})
		.then(data=>{
		 const {body}= data
		 response.musicData.albumsImages = body.data.map(music=>music.album.cover_xl)
		 resolve(response)
		})
	})
	 .catch(error=>{
		console.error(error)
		response.urlIsValid = false
		response.errorMessage = "Verifique a URL"
		resolve(response)
	 })
 },
 async download(musicData,client){
	//console.log(musicData)

	client.emit("downloadProgress","Processando video")
	const YD = new YoutubeMp3Downloader(YDSettings)
	YD.download(musicData.id,`${musicData.id}.mp3`)
	YD.on("finished",async(err,data)=>{
	 if(err){
		console.error("Ocorreu um erro id:",musicData.id)
		console.error("Erro",err)
		client.emit("downloadError","Ocorreu um erro inesperado")
	 }else{
		if(musicData.albumSelected !== false){
		 const imagemDownload = ()=>{ 
			return new Promise(resolve=>{
			 request(musicData.albumsImages[musicData.albumSelected])
				.pipe(fs.createWriteStream(`${__dirname}/images/${musicData.id}.jpg`)).on('close', resolve);
			})}
		 client.emit("downloadProgress","Preparando imagem do album")
		 await imagemDownload()
		}
		client.emit("downloadProgress","Insirindo dados na musica")
		const tags = {
		 title: musicData.name,
		 artist: musicData.artists.join(", "),
		 album: musicData.album
		}
		if(musicData.albumSelected!==false)tags.APIC=`${__dirname}/images/${musicData.id}.jpg`
		if(musicData.letraIsValid){
		 tags.unsynchronisedLyrics = {
			language:"eng",
			text:musicData.lyrics
		 }
		}
		if(musicData.traducaoIsValid){
		 if(tags.unsynchronisedLyrics){
			tags.unsynchronisedLyrics.text=tags.unsynchronisedLyrics.text+ "\n --Tradução--\n"+musicData.traslation
		 }
		 else{
			tags.unsynchronisedLyrics = {
			 language:"eng",
			 text:musicData.traslation
			}
		 }
		}
		const ID3FrameBuffer = NodeID3.create(tags)
		const success = NodeID3.write(tags, data.file)
		if(success){
		 client.emit("downloadSucess",true)
		}
		else client.emit("downloadError","Erro ao insirir dados da musica")
	 }})
	YD.on("error",(err)=>{
	 console.error("Ocorreu um erro id:",musicData.id)
	 console.error("Erro",err)
	 client.emit("downloadError","Ocorreu um erro inesperado")
	})
	YD.on("progress",(data)=>{
	 client.emit("downloadProgress",`Processando video:${parseInt(data.progress.percentage)}%`)

	})
 }
}
