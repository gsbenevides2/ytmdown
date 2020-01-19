const caramelPuppy = require("caramel-puppy")({
 __filename
})
const apis = require("./apis")

function translate(text){
 return new Promise(resolve=>{
	apis.yandex.get({
	 url:"/tr.json/translate/",
	 qs:{
		text,lang:"pt"
	 }
	},(error,req,body)=>{
	 caramelPuppy.request(req,error)
	 if(!error && req.statusCode===200) resolve(body.text.join(""))
	 else resolve(null)
	})
 })
}

module.exports = (searchTerm)=>{
 return new Promise((resolve,reject)=>{
	apis.someRandom.get({
	 url:"/lyrics",
	 qs:{title:searchTerm}
	},async (error,req,body)=>{
	 caramelPuppy.request(req,error)
	 if(!error || body.error){
		const {lyrics} = body
		console.log(lyrics)
		const translation = await translate(lyrics)
		console.log(translation)
		resolve({lyrics,translation})
	 }
	 else reject("Erro desconhecido")
	})
 })
}
