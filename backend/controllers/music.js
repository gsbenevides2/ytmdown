const caramelPuppy = require("caramel-puppy")({
 __filename
})
const {
 getMusic,
} = require("../getMusicInfo")

module.exports ={
 async index(request,response){
	const {id} = request.query
	caramelPuppy.log("Id",id)
	getMusic(id)
	 .then(result=>{
		caramelPuppy.log("Result",result)
		response.send(result)
	 })
	 .catch(e=>{response.status(400).send(e)})
 }
}
