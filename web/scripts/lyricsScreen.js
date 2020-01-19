const lyricsScreen = new Vue({
 el:"#lyricsScreen",
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
	 const socket = io();
	 progressBar.visible = true
	 this.visible = false
	 loadingScreen.visible = true
	 socket.emit("downloadMusic",musicData)
	 socket.on("event",eventData=>{
		loadingScreen.event(eventData)
	 })
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
 </div>
 `
})
