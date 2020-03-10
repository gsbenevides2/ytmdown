const caramelPuppy = require("caramel-puppy")({
 __filename
})
const {
 getVideoId
} = require("../getVideoInfo")

module.exports ={
 async index(request,response){
	const {url} = request.query
	caramelPuppy.log("Url:",url)
	const id = await getVideoId(url)
	 .catch(e=>{response.status(400).send(e)})
	response.redirect(`http://www.youtube.com/embed/${id}`)
 }
}
