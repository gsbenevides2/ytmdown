const ytdl = require("ytdl-core")
const request = require("request")
const progress = require("request-progress")
const ffmpeg = require("fluent-ffmpeg")
const ffmpegOnProgress = require('ffmpeg-on-progress')
const nodeId3 = require("node-id3")
const fs = require("fs")
const platform = require("os").platform()

switch(platform){
 case "android":
	ffmpeg.setFfmpegPath("/data/data/com.termux/files/usr/bin/ffmpeg")
	break
 default:
	ffmpeg.setFfmpegPath("/app/vendor/ffmpeg/ffmpeg")
	break;
}

function downloadMusic(videoUrl,id,eventEmitter){
 return new Promise(resolve=>{
	eventEmitter({
	 type:"Log",
	 message:"Obtendo links de download..."
	})
	ytdl.getInfo(videoUrl,(err,info)=>{
	 if(err){
		console.log("Error",err)
		eventEmitter({
		 type:"Error",
		 message:err
		})
	 }
	 else{
		const format = info.formats.filter(ele=>ele.mimeType.includes("audio/mp4"))[0]
		eventEmitter({
		 type:"Log",
		 message:"Baixando música..."
		})
		const filePure = fs.createWriteStream(`${process.cwd()}/music/${id}_pure.mp3`)
		progress(request(format.url))
		 .on('progress',state=>{
			const percentage = `${(state.percent*100).toFixed(2)}%`
			eventEmitter({
			 type:"Log",
			 message:`Baixando música...${percentage}`
			})
		 })
		 .on('error',err=>{
			eventEmitter({
		 type:"Error",
		 message:err
		})
		 })
		 .on(`end`,()=>{
			console.log("End")
			eventEmitter({
			 type:"Log",
			 message:"Convertendo arquivo..."
			})
			const fileConverted = `${process.cwd()}/music/${id}.mp3`
			new ffmpeg(`${process.cwd()}/music/${id}_pure.mp3`)
			 .audioBitrate(format.audioBitrate)
			 .withAudioCodec("libmp3lame")
			 .toFormat("mp3")
			 .outputOptions(["-id3v2_version","4"])
			 .on("progress",ffmpegOnProgress(percent=>{
				const percentage = `${(percent*100).toFixed(2)}%`
				eventEmitter({
				 type:"Log",
				 message:`Convertendo arquivo...${percentage}`
				})
			 }))
			 .on("error",err=>{
				eventEmitter({
		 type:"Error",
		 message:err
		})
			 })
			 .on("end",()=>{
				console.log("End")
				resolve(info.video_id)
			 })
			 .saveToFile(fileConverted)
		 })
		 .pipe(filePure)
	 }
	})
 })
}
function downloadCapa(imageUrl,id,eventEmitter){
 eventEmitter({
	type:"Log",
	message:`Baixando imagem...`
 })
 return new Promise(resolve=>{
	progress(request(imageUrl))
	 .on("progress",state=>{
		const percentage = `${(state.percent*100).toFixed(2)}%`
		eventEmitter({
		 type:"Log",
		 message:`Baixando imagem...${percentage}`
		})
	 })
	 .on("error",err=>{
		eventEmitter({
		 type:"Error",
		 message:err
		})
	 })
	 .on("end",()=>{
		eventEmitter({
		 type:"Log",
		 message:"Aguarde"
		})
		setTimeout(resolve,2000)
	 })
	 .pipe(fs.createWriteStream(`${process.cwd()}/images/${id}.jpg`))
 })
}
function setId3(musicData,id,eventEmitter){
 eventEmitter({
	type:"Log",
	message:"Adicionado tags..."
 })
 return new Promise(resolve=>{
	const tags = {
	 title:musicData.name,
	 artist:musicData.artist,
	 album:musicData.album,
	 APIC:`${process.cwd()}/images/${id}.jpg`
	}
	if(musicData.lyrics || musicData.translation){
	 tags.unsynchronisedLyrics = {
		language:"eng",
		text:`${musicData.lyrics || ""}\n${musicData.translation || ""}`
	 }
	}
	const success = nodeId3.write(tags, `${process.cwd()}/music/${id}.mp3`)
	if(success)resolve()
	else{
	 eventEmitter({
		type:"Error",
		message:"Ocoreu um erro desconhecido ao inserir as tags"
	 })
	}

 })
}
module.exports = {
 downloadMusic,
 downloadCapa,
 setId3
}
