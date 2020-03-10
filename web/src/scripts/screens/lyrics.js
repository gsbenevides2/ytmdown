const lyricsScreen = new Vue({
 el:".screens #lyrics",
 data:{
	visible:false,
	lyrics:null,
	translation:null,
 },
 methods:{
	next(translation,lyrics){
	 const musicData =albumScreen.music
	 musicData.lyrics = lyrics ? this.lyrics.join("\n") : null
	 musicData.translation = translation ? this.translation.join("\n") : null
	 musicData.url = urlScreen.url
	 this.visible = false
	 loadingScreen.downloadStart(musicData)
	},
	link(){
	 const fileInput = document.createElement("input")
	 fileInput.addEventListener("change",async (e)=>{
		const file = fileInput.files[0]
		const musicData =albumScreen.music
		musicData.lyrics = await file.text()
		musicData.translation = null
		musicData.url = urlScreen.url
		this.visible = false
		loadingScreen.downloadStart(musicData)

	 })
	 fileInput.setAttribute("type","file")
	 fileInput.click()
	}
 },
 template:`
 <div v-show="visible" class="screen">
 <span class="lyrics" v-for="(lyric,index) in lyrics">
	<span class="original">{{lyric}}</span>
	<span v-if="translation" class="translation">{{translation[index]}}</span>
 </span>
 <button @click="next(true,true)" class="mdc-button" style="width:100%" v-if="translation">Continuar com letra e tradução</button>
 <button @click="next(false,true)" class="mdc-button" style="width:100%">Continuar somente com a letra</button>
 <button @click="next(false,false)" class="mdc-button" style="width:100%">Continuar sem a letra</button>
 <button @click="link()" class="mdc-button" style="width:100%">LRC</button>
 </div>
 `
})
