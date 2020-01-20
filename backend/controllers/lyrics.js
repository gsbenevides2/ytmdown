const caramelPuppy = require("caramel-puppy")({
 __filename
})

const getLyrics = require("../getLyrics")

module.exports ={
 async index(request,response){
	const {name,artist}= request.query
	caramelPuppy.log("Name",name,"Artist",artist)
	getLyrics(`${name} ${artist}`)
	 .then(result=>{
		caramelPuppy.log("Result",result)
		response.json(result)
	 })
	 .catch(e=>{response.status(400).send(e)})
 }
}
