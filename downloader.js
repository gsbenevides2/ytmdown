const axios = require("axios")
const os = require("os")
const credentials = require("./credentials.json")
const solenolyrics= require("solenolyrics");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require("fs")
if (!fs.existsSync("music")){
	fs.mkdirSync("music");
}
let ffmpegPath
switch(os.platform()){
	case "android":
		ffmpegPath = "/data/data/com.termux/files/usr/bin/ffmpeg"
		break
}
const YDSettings= {
	fmpegPath,
	outputPath:`${__dirname}/music`,
	queueParallelism:2,
	progressTimeout:2000
}
const youtubeAPI = axios.create({
	baseURL:"https://www.googleapis.com/youtube/v3",
})
const youtubeAPIParams = {
	key:"AIzaSyCMnJSUnv4uj17TpHk3a2QRWq_bs9k34F8"
}
const deezerAPI = axios.create({
	baseURL: "https://api.deezer.com"
})
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
			youtubeAPI.get("/videos",{
				params:Object.assign({
					part:["snippet"].join(","),
					id,
				},youtubeAPIParams)
			}).then(res=>{
				const description = res.data.items[0].snippet.description
				response.urlIsValid = true
				const lines = description.split("\n")
				const line = lines[2].split(" · ")
				response.musicData.album= lines[4];
				[response.musicData.name, ...response.musicData.artists ]= line
				search = `${line.join(",")},${response.musicData.album}`
				return solenolyrics.requestLyricsFor(`${response.musicData.name},${response.musicData.artists.join(" ")}`)
			}).then(lyrics=>{		
				response.musicData.lyrics = lyrics
				return deezerAPI.get("/search",{params:{q:search}})
			}).then(res=>{
				response.musicData.albumsImages = res.data.data.map(music=>music.album.cover_xl)
				resolve(response)
			}).catch(error=>{
				console.error(error)
				response.urlIsValid = false
				response.errorMessage = "Verifique a URL"
				resolve(response)
			})
		})
	},
	async download(musicData,client){
		console.log(musicData)
		client.emit("downloadProgress","Processando video")
		const YD = new YoutubeMp3Downloader(YDSettings)
		YD.download(musicData.id,`${musicData.id}.mp3`)
		YD.on("finished",(err,data)=>{
			if(err){
				console.error("Ocorreu um erro id:",musicData.id)
				console.error("Erro",err)
				client.emit("downloadError","Ocorreu um erro inesperado")
			}else{
				console.log(data)
			}
		})
		YD.on("error",(err)=>{
			console.error("Ocorreu um erro id:",musicData.id)
			console.error("Erro",err)
			client.emit("downloadError","Ocorreu um erro inesperado")
		})
		YD.on("progress",(data)=>{
			client.emit("downloadProgress",`Processando video:${parseInt(data.progress.percentage)}`)

		})
	}
}
