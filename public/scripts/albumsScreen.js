const albumsScreen = new Vue({
 el:"#albumsScreen",
 data:{
	visible:false,
	musicName:"",
	albums:[]
 },
 methods:{
	selectMusic(id){
	 progressBar.visible = true
	 fetch(`/music?id=${id}`)
		.then(async res=>{
		 if(res.status === 200){
			const music = await res.json()
			albumsScreen.visible = false
			albumScreen.visible = true
			albumScreen.music = music
		 }
		 else{
			const text = await res.text()
			throw new Error(text)
		 }
		 progressBar.visible = false
		})
		.catch(error=>{
		 progressBar.visible = false
		 alert(`Ocorreu um erro:${error.message}`)
		})
	}
 },
 mounted(){
	mdc.textField.MDCTextField.attachTo(this.$refs.musicName)
 },
 template:`
	<div v-show="visible" class="screen">
	 <div v-show="albums.length === 0">
		<h4 class="mdc-typography--headline6">Por favor digite o nome da música:</h4>
		<div ref="musicName" class="mdc-text-field">
		 <input @ v-model="musicName" id="musicName" class="mdc-text-field__input"/>
		 <label for="musicName" class="mdc-floating-label">Nome da música</label>
		 <div class="mdc-line-ripple"></div>
		</div>
	 </div>
	 <ul style="padding:0">
		<li v-for="music in albums" @click="selectMusic(music.id)" class="mdc-card" style="width:100%; margin-bottom:10px;">
		 <div class="mdc-card__primary-action" style="display:flex;flex-direction:row;">
			<div class="mdc-card__media mdc-card__media--square" style="flex:0 0 150px !important;" v-bind:style="{backgroundImage:'url(&quot;'+music.cover+'&quot;)'}"></div>
			<div style="padding:12px;">
			 <h2 class="mdc-typography--headline6">{{music.title}}</h2>
			 <h3 class="mdc-typography--subtitle2">{{music.artist}} - {{music.album}}</h3>
			</div>
		 </div>
		</li>
	 </ul>
	</div>
	`
});
