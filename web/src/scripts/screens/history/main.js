const historyScreen = new Vue({
 el:'.screens #history',
 data:{
	history:null,
	visible:true,
 },
 methods:{
	open(musicData){
	 topAppBar.navigationIcon = "arrow_back"
	 this.visible =false
	 musicScreen.open(musicData)
	}
 },
 mounted(){
	firebase.auth().onAuthStateChanged(user=>{
	 if(!user) window.location.href ='/login?sendTo=history'
	 else {
		firebase.firestore().collection(`users/${user.uid}/history`).get()
		 .then(collectionSnapshot=>{
			document.querySelector('.load-initial').style.display = 'none'
			this.history = collectionSnapshot.docs.map(doc=>{return{
			 id:doc.id,
			 ...doc.data()
			}})
		 })
		 .catch(console.error)
	 }
	})
 },
 template:`
 <div v-if='visible' id='screen-history'>
	<div v-for="music in history" class="mdc-card">
	 <div class="mdc-card__primary-action" @click='open(music)'>
	 <div class="mdc-card__media mdc-card__media--square" v-bind:style="{backgroundImage:'url(&quot;'+music.cover+'&quot;)'}"></div>
		<span class='mdc-typography--subtitle1'>{{music.name}}</span>
		<span class='mdc-typography--body2'>{{music.album}}-{{music.artist}}</span>
	 </div>
	</div>
	<div class='empty' v-if='history && history.length===0'>
	 <lottie-player src="https://assets3.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay ></lottie-player>
	 <h2>Ops não tem nada aqui!</h2>
	</div>
 </div>
 `
})
