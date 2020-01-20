const request = require("request")
require("dotenv").config()
module.exports = {
 deezer: request.defaults({
	baseUrl:"https://api.deezer.com",
	json:true
 }),
 youtube:request.defaults({
	baseUrl:"https://www.googleapis.com/youtube/v3",
	qs:{key:process.env.GOOGLEAPI},
	json:true
 }),
 someRandom:request.defaults({
	baseUrl:"https://some-random-api.ml/",
	json:true
 }),
 yandex:request.defaults({
	baseUrl:"https://translate.yandex.net/api/v1.5",
	qs:{key:process.env.YANDEX},
	json:true
 })
}
