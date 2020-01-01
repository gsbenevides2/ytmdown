const request = require("request")
const apis = {
 deezer: request.defaults({
	baseUrl:"https://api.deezer.com",
	json:true
 })
}

function searchInDeezer(searchTerm){
 return new Promise((resolve,reject)=>{
	const results = []
	apis.deezer.get({
	 url:"/search",
	 qs:{
		q:searchTerm
	 }
	},(error,response,body)=>{
	 if(!error){
		body.data.map(result=>{
		 results.push({
			id:result.id,
			title:result.title,
			artist:result.artist.name,
			album:result.album.title,
			cover:result.album.cover_xl
		 })
		})
	 }
	 resolve(results)
	})
 })
}
function getMusicInDeezer(id){
 return new Promise(resolve=>{
	apis.deezer.get({
	 url:`/track/${id}`
	},(error,response,body)=>{
	 if(!error){
		let name,number,artist,album,year,cover
		artist = body.artist.name
		name = body.title
		const feats = []
		body.contributors.map(contributor=>{
		 if(contributor.id !== body.artist.id){
			feats.push(contributor.name)
		 }
		})
		if(feats.length!== 0){
		 name += ` (feat ${feats.join(", ")})`
		}
		album = body.album.title
		cover = body.album.cover_xl
		number = parseInt(body.track_position)
		year = parseInt(body.release_date.split("-")[0])
		resolve({name,artist,album,number,year,cover})
	 }
	})
 })
}
module.exports={
 getMusic:getMusicInDeezer,
 searchMusic:searchInDeezer
}

