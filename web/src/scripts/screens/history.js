const history = new Vue({
 el:'.screens #history',
 data:{
	history:null,
 },
 mounted(){
	firebase.auth().onAuthStateChanged(user=>{
	 if(!user) window.location.href ='/login?sendTo=history'
	 else {
		firebase.firestore().collection(`users/${user.uid}/history`).get()
		 .then(collectionSnapshot=>{
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
 <div id='screen-history'>
	<div v-for="music in history" class="mdc-card">
	 <div class="mdc-card__primary-action">
	 <div class="mdc-card__media mdc-card__media--square" v-bind:style="{backgroundImage:'url(&quot;'+music.cover+'&quot;)'}"></div>
		<h1>{{music.name}}</h1>
		<h4>{{music.album}}-{{music.artist}}</h4>
	 </div>
	</div>
	<div class='empty' v-if='history && history.length===0'>
	 <lottie-player src="https://assets3.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay ></lottie-player>
	 <h2>Ops não tem nada aqui!</h2>
	</div>
 </div>
 `
})
