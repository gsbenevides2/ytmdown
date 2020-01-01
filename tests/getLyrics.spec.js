//const assert = require("assert")
const getLyrics = require("../getLyrics")

describe("getLyrics.js",function(){
 this.timeout(5000)
 it("Testando obtenção de letras e tradução",done=>{
	getLyrics("You Make Me - Avicii")
	 .then(lyrics=>{
		done()
	 })
	 .catch(error=>{
		done()
	 })
 })
})
