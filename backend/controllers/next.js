const {deezer} = require("../services/apis") 

module.exports = {
 index(request,response){
	const {q,index} = request.query
	deezer.get({
	 url:`/search`,
	 qs:request.query
	},(r,re,res)=>{
	 let next
	 if(res.next){
		next = `/next${(new URL(res.next)).search}`
	 }
		response.json({
		 next,
		 albums:res.data.map(result=>{
			return {
			 id:result.id,
			 title:result.title,
			 artist:result.artist.name,
			 album:result.album.title,
			 cover:result.album.cover_xl
			}
		 })
		})
	 })
 }
}
