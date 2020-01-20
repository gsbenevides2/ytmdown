const caramelPuppy = require("caramel-puppy")({
 __filename
})
const {
 getVideoId,
 generateSearchTerm
} = require("../getVideoInfo")
const {
 searchMusic,
 getMusic,
} = require("../getMusicInfo")

module.exports ={
 async index(request,response){
	const {url} = request.query
	caramelPuppy.log("Url:",url)
	const id = await getVideoId(url)
	 .catch(e=>{response.status(400).send(e)})
	caramelPuppy.log("Id:",id)
	if(id){
	 const searchTerm = request.query.searchTerm || await generateSearchTerm(id)
		.catch(e=>{response.status(400).send(e)})
	 caramelPuppy.log("SearchTerm:",searchTerm)
	 if(searchTerm){
		const results = await searchMusic(searchTerm)
		 .catch(e=>{response.status(400).send(e)})
		caramelPuppy.log("Results:",results)
		response.json({
		 idOfVideo:id,
		 searchTerm,
		 albumResults:results
		})
	 }
	}
 }
}
