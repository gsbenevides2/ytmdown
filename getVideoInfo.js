const request = require("request")
const ytdl = require("ytdl-core")
const caramelPuppy = require("caramel-puppy")({
 __filename
})
require("dotenv").config()

const youtubeApi = request.defaults({
 baseUrl:"https://www.googleapis.com/youtube/v3",
 qs:{key:process.env.GOOGLEAPI},
 json:true
})

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
	 caramelPuppy.request(req)
	 if(!error && body.pageInfo.totalResults){
		const {description,title} = body.items[0].snippet
		const lines = description.split("\n")
		const thirdRow = lines[2] || ""
		const [name,artist] = thirdRow.split(" · ")
		if(artist) resolve(`${name} - ${artist}`)
		else resolve(title)
	 }
	 else reject("Video Invalido")
	})
 })
}


module.exports={
 generateSearchTerm,
 getVideoId
}
