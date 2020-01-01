const assert = require('assert');
const {
 generateSearchTerm,
 getVideoId
}= require('../getVideoInfo')
describe("getVideoInfo.js",()=>{
 it("Teste de searchTerm de musica",async ()=>{
	const id = await getVideoId("https://music.youtube.com/watch?v=h8rxsShxan4&feature=share")
	return generateSearchTerm(id)
	 .then(searchTerm=>{
		assert.equal(searchTerm,"Runaway (U & I) - Galantis")
	 });
 });
 it("Teste de searchTerm com clipe",async()=>{
	const id = await getVideoId("https://youtu.be/5XR7naZ_zZA")
	return generateSearchTerm(id)
	 .then(searchTerm=>{
		assert.equal(searchTerm,"Galantis - Runaway (U & I) (Official Video)")
	 })
 })
 it("Teste de searchTerm com video inexistente",async ()=>{
	const id = await getVideoId("https://youtu.be/6XR7naZ_zZA")
	return generateSearchTerm(id)
	 .catch(message=>{
		assert.equal(message,"Video Invalido")
	 })
 })
 it("Teste de videoId correto",done=>{
	getVideoId("https://youtu.be/5XR7naZ_zZA")
	 .then(id=>{
		assert.equal(id,"5XR7naZ_zZA")
		done()
	 })
 })
 it("Teste de videoId errado",done=>{
	getVideoId("https://youtu.be/XR7naZ_zZA")
	 .catch(message=>{
		assert.equal(message,"Url Invalida")
		done()
	 })
 })
});
