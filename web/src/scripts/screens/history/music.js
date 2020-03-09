const musicScreen = new Vue({
 el:'.screens #music',
 data:{
	visible:false,
	music:{},
	iframeUrl:''	
 },
 methods:{
	open(music){
	 this.music= music
	 this.visible = true
	 this.iframeUrl = `${makeUrl()}iframe?url=${music.url}`
	},
	download(){
	 this.visible=false
	 loadingScreen.downloadStart({...this.music,saveHistory:false})
	},
	deleteHistory(){
	 const {id} = this.music
	 const {uid} = firebase.auth().currentUser
	 progressBar.visible = true
	 firebase.firestore().doc(`users/${uid}/history/${id}`)
		.delete()
		.then(()=>{
		 progressBar.visible = false
		 topAppBar.navigationIcon = "menu"
		 const index = historyScreen.history.findIndex(music=>music.id===id)
		 historyScreen.history.splice(index,1)
		 this.visible = false
		 historyScreen.visible = true
		})

	}
 },
 template:`
 <div v-if='visible' id='screen-music' class='mdc-layout-grid'>
	<div class="mdc-layout-grid__inner">
	 <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 ">
		<img v-bind:src="music.cover"/>
	 </div>
	 <div class="mdc-layout-grid__cell">
		<h2>{{music.name}}</h2>
		<div>
		 <i class='material-icons'>person</i> <span>{{music.artist}}</span> <br/>
		 <i class="material-icons">album</i> <span>{{music.album}}</span>
		</div>
		<button @click='download' class="mdc-button">Baixar Novamente</button>
		<button @click='deleteHistory' class="mdc-button">Deletar</button>
	 </div>
	 <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
		<iframe v-bind:src='iframeUrl' frameborder="0"></iframe>
	 </div>
	</div>
 </div>
 `
})
