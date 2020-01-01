const request = require("request")
require("dotenv").config()

const lyricsApi = request.defaults({
 baseUrl:"https://some-random-api.ml/",
 json:true
})
const yandexApi = request.defaults({
 baseUrl:"https://translate.yandex.net/api/v1.5",
 qs:{key:process.env.YANDEX},
 json:true
})

function translate(text){
 return new Promise(resolve=>{
	yandexApi.get({
	 url:"/tr.json/translate/",
	 qs:{
		text,lang:"pt"
	 }
	},(error,req,body)=>{
	 if(!error && req.statusCode===200) resolve(body.text.join(""))
	 else resolve(null)
	})
 })
}

module.exports = (searchTerm)=>{
 return new Promise((resolve,reject)=>{
	lyricsApi.get({
	 url:"/lyrics",
	 qs:{title:searchTerm}
	},async (error,req,body)=>{
	 if(!error){
		const {lyrics} = body
		const translation = await translate(lyrics) 
		resolve({lyrics,translation})
	 }
	 else reject("Erro desconhecido")
	})
 })
}
