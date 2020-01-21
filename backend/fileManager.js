const fs = require("fs")
const path = require("path")

const musicPath = path.join(
 process.cwd(),
 "/backend/music"
)
const imagePath = path.join(
 process.cwd(),
 "/backend/image"
)

module.exports = {
 configFolders(){
	if(!fs.existsSync(musicPath)){
	 fs.mkdirSync(musicPath);
	}
	if(!fs.existsSync(imagePath)){
	 fs.mkdirSync(imagePath)
	}
 },
 clearFolders(){
	fs.rmdirSync(musicPath,{recursive:true})
	fs.rmdirSync(imagePath,{recursive:true})
	fs.mkdirSync(musicPath);
	fs.mkdirSync(imagePath)
 },
 getFiles(id){
	const filePure = fs.createWriteStream(
	 path.join(musicPath,`${id}_pure.mp3`)
	)
	filePure.isStream = true
	const fileConverted = fs.createWriteStream(
	 path.join(musicPath,`${id}_converted.mp3`)
	)
	fileConverted.isStream = true
	const imageFile = fs.createWriteStream(
	 path.join(imagePath,`${id}.jpg`)
	)
	return{
	 filePure,
	 fileConverted,
	 imageFile
	}
 },
 getMusicFile(id){
	return fs.createReadStream(
	 path.join(musicPath,`${id}_converted.mp3`)
	)
 }
}

