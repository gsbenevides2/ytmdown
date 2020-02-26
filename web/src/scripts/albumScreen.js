const albumScreen = new Vue({
 el:"#albumScreen",
 data:{
	visible:false,
	music:{}
 },
 methods:{
	next(){
	 progressBar.visible = true
	 fetch(`/lyrics?name=${this.music.name}&artist=${this.music.artist}`)
		.then(async res=>{
		 const {data} = res
		 albumScreen.visible = false
		 lyricsScreen.visible = true
		 lyricsScreen.lyrics = data.lyrics? data.lyrics.split("\n") : null
		 lyricsScreen.translation = data.translation? data.translation.split("\n") :null
		 progressBar.visible = false
		})
		.catch(error=>{
		 progressBar.visible = false
		 alert(`Ocorreu um erro:${error.request.responseText||error.message}`)
		})
	},
 },
 updated(){
	document.querySelectorAll(".mdc-text-field").forEach(mdc.textField.MDCTextField.attachTo)
 },
 mounted(){
	document.querySelectorAll(".mdc-text-field").forEach(mdc.textField.MDCTextField.attachTo)
 },
 template:`
 <div v-show="visible" class="mdc-card mdc-card--outlined screen">
	<div class="mdc-card__primary-action">
	 <div class="mdc-card__media mdc-card__media--square" v-bind:style="{backgroundImage:'url(&quot;'+music.cover+'&quot;)'}"></div>
	 <div style="padding:12px;">
		<div class="mdc-text-field">
			<input v-model="music.name" id="musicNameInput" class="mdc-text-field__input" type="text" autocomplete="off"/>
			<label class="mdc-floating-label" for="musicNameInput">Nome da Música</label>
		 <div class="mdc-line-ripple"></div>
		</div>
		<div class="mdc-text-field">
		 <input v-model="music.artist" id="musicArtistInput" class="mdc-text-field__input" type="text" autocomplete="off"/>
		 <label class="mdc-floating-label" for="musicArtistInput">Nome do Artista</label>
		 <div class="mdc-line-ripple"></div>
		</div>
		<div class="mdc-text-field">
		 <input v-model="music.album" id="musicAlbumInput" class="mdc-text-field__input" type="text" autocomplete="off"/>
		 <label class="mdc-floating-label" for="musicAlbumInput">Nome do Album</label>
		 <div class="mdc-line-ripple"></div>
		</div>
		<div class="mdc-text-field">
		 <input v-model="music.number" id="musicNumberInput" class="mdc-text-field__input" type="number" autocomplete="off"/>
		 <label class="mdc-floating-label" for="musicAlbumInput">Numero da faixa</label>
		 <div class="mdc-line-ripple"></div>
		</div>
		<div class="mdc-text-field">
		 <input v-model="music.year" id="musicYearInput" class="mdc-text-field__input" type="number" autocomplete="off"/>
		 <label class="mdc-floating-label" for="musicAlbumInput">Ano</label>
		 <div class="mdc-line-ripple"></div>
		</div>
	 </div>
	 <div class="mdc-card__actions">
		<div class="mdc-card__action-icons">
		 <button @click="next" class="mdc-button">Continuar</button>
		</div>
	 </div>
	</div>
 </div>
 `
})
