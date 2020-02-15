const caramelPuppy = require("caramel-puppy")({
 __filename
})
const apis = require("./services/apis")

function translateLyrics(lyrics){
 function translateText(text){
	return new Promise((resolve,reject)=>{
	 if(text === "") return resolve("")
	 apis.yandex.get({
		url:"/tr.json/translate",
		qs:{
		 text,lang:"pt"
		}
	 },(error,req,body)=>{
		caramelPuppy.request(req,error)
		if(!error && req.statusCode===200) resolve(body.text.join(""))
		else reject()
	 })
	})
 }
 return new Promise(resolve=>{

	const translations = 
	 lyrics.split("\n")
	 .map(translateText)
	Promise.all(translations)
	 .then(translation=>{
		console.log(translation)
		resolve(translation.join("\n"))
	 })
	 .catch(()=>{
		resolve(null)
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
		if(lyrics){
		console.log(lyrics)
		const translation = await translateLyrics(lyrics)
		console.log(translation)
		resolve({lyrics,translation})
	 }
		else resolve({lyrics:null,translation:null})
	 }
	 else reject("Erro desconhecido")
	})
 })
}
