const request = require("request")
const ytdl = require("ytdl-core")
const caramelPuppy = require("caramel-puppy")({
 __filename
})
const youtubeApi = require("./services/apis").youtube

function getVideoId(url){
 return new Promise((resolve,reject)=>{
	const id = ytdl.getURLVideoID(url)
	if(typeof id === "string")resolve(id)
	else reject("Url Invalida")
 })
}
function generateSearchTerm(videoId){
 return new Promise((resolve,reject)=>{
	youtubeApi.get({
	 url:"/videos",
	 time:true,
	 qs:{
		id:videoId,
		part:"snippet"
	 }
	},(error,req,body)=>{
	 caramelPuppy.request(req,error)
	 if(!error && body.pageInfo.totalResults){
		const {description,title} = body.items[0].snippet
		const lines = description.split("\n")
		const thirdRow = lines[2] || ""
		const [name,artist] = thirdRow.split(" · ")
		if(artist) resolve(`${name} - ${artist}`)
		else {
		 const standards = [
			/\(((.)+)?\)/gm, //Rmmove ()
			/\[((.)+)?\]/gm, //Remove []
			/\#([a-zA-Z]+)/gm, //Remove #
			'Oficial',
			'OFICIAL',
			'Official MV',
			'Official',
			'OFFICIAL',
			'"',
			"'"
		 ]
		 let sanitizedTitle = title
		 standards.map(standard=>{
			sanitizedTitle = sanitizedTitle.replace(standard,"")
		 })
		 resolve(sanitizedTitle)
		}
	 }
	 else reject("Video Invalido")
	})
 })
}


module.exports={
 generateSearchTerm,
 getVideoId
}
