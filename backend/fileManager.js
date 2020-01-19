const fs = require("fs")

module.exports = {
 configFolders(){
	if(!fs.existsSync("music")){
	 fs.mkdirSync("music");
	}
	if(!fs.existsSync("images")){
	 fs.mkdirSync("images")
	}
 },
 clearFolders(){
	fs.rmdirSync("./music",{recursive:true})
	fs.rmdirSync("./images",{recursive:true})
	fs.mkdirSync("music");
	fs.mkdirSync("images")
 }
}

