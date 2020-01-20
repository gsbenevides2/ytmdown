const ytdl = require("ytdl-core")
const request = require("request")
const progress = require("request-progress")
const ffmpeg = require("fluent-ffmpeg")
const ffmpegOnProgress = require('ffmpeg-on-progress')
const nodeId3 = require("node-id3")
const platform = require("os").platform()
const {
 configFolders,
 getFiles,
 getMusicFile
} = require("./fileManager")

configFolders()

switch(platform){
 case "android":
	ffmpeg.setFfmpegPath("/data/data/com.termux/files/usr/bin/ffmpeg")
	break
 default:
	ffmpeg.setFfmpegPath("/app/vendor/ffmpeg/ffmpeg")
	break;
}

class DownloaderMusic{
 constructor(musicData,id,eventEmitter){
	this.musicData = musicData
	this.eventEmitter = eventEmitter
	const {
	 fileConverted,
	 filePure,
	 imageFile
	} = getFiles(id)
	this.fileConverted = fileConverted
	this.filePure = filePure
	this.imageFile = imageFile
 }
 downloadMusic(){
	return new Promise(resolve=>{
	 this.eventEmitter({
		type:"Log",
		message:"Obtendo links de download..."
	 })
	 ytdl.getInfo(this.musicData.url,(err,info)=>{
		if(err){
		 this.eventEmitter({
			type:"Error",
			message:err
		 })
		}
		else{
		 const format = info.formats.filter(ele=>ele.mimeType.includes("audio/mp4"))[0]
		 this.eventEmitter({
			type:"Log",
			message:"Baixando música..."
		 })
		 progress(request(format.url))
			.on('progress',state=>{
			 const percentage = `${(state.percent*100).toFixed(2)}%`
			 this.eventEmitter({
				type:"Log",
				message:`Baixando música...${percentage}`
			 })
			})
			.on('error',err=>{
			 this.eventEmitter({
				type:"Error",
				message:err
			 })
			})
			.on(`end`,()=>{
			 this.eventEmitter({
				type:"Log",
				message:"Convertendo arquivo..."
			 })
			 //console.log(this)
			 new ffmpeg(this.filePure.path)
				.audioBitrate(format.audioBitrate)
				.withAudioCodec("libmp3lame")
				.toFormat("mp3")
				.outputOptions(["-id3v2_version","4"])
				.on("progress",ffmpegOnProgress(percent=>{
				 const percentage = `${(percent*100).toFixed(2)}%`
				 this.eventEmitter({
					type:"Log",
					message:`Convertendo arquivo...${percentage}`
				 })
				}))
				.on("error",err=>{
				 this.eventEmitter({
					type:"Error",
					message:err
				 })
				})
				.on("end",()=>{
				 console.log("End")
				 resolve(info.video_id)
				})
				.writeToStream(this.fileConverted,{end:true})
			})
			.pipe(this.filePure)
		}
	 })
	})
 }
 downloadCapa(){
	this.eventEmitter({
	 type:"Log",
	 message:`Baixando imagem...`
	})
	return new Promise(resolve=>{
	 progress(request(this.musicData.cover))
		.on("progress",state=>{
		 const percentage = `${(state.percent*100).toFixed(2)}%`
		 this.eventEmitter({
			type:"Log",
			message:`Baixando imagem...${percentage}`
		 })
		})
		.on("error",err=>{
		 this.eventEmitter({
			type:"Error",
			message:err
		 })
		})
		.on("end",()=>{
		 this.eventEmitter({
			type:"Log",
			message:"Aguarde"
		 })
		 setTimeout(resolve,2000)
		})
		.pipe(this.imageFile)
	})
 }
 setId3(musicData,id,eventEmitter){
	this.eventEmitter({
	 type:"Log",
	 message:"Adicionado tags..."
	})
	return new Promise(resolve=>{
	 const {musicData} = this
	 const tags = {
		title:musicData.name,
		artist:musicData.artist,
		album:musicData.album,
		APIC:this.imageFile.path
	 }
	 if(musicData.lyrics || musicData.translation){
		tags.unsynchronisedLyrics = {
		 language:"eng",
		 text:`${musicData.lyrics || ""}\n${musicData.translation || ""}`
		}
	 }
	 const success = nodeId3.write(tags,this.fileConverted.path)
	 if(success)resolve()
	 else{
		this.eventEmitter({
		 type:"Error",
		 message:"Ocoreu um erro desconhecido ao inserir as tags"
		})
	 }

	})
 }

}

module.exports = {
 DownloaderMusic,getMusicFile
}
