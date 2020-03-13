const settingsScreen = new Vue({
 el:'.screen',
 data:{
	user:{},
	signOut:false,
	version:{}
 },
 methods:{
	deleteHistoryAll(){
	 progressBar.visible = true
	 firebase.firestore()
		.collection(`users/${this.user.uid}/history`)
		.get()
		.then(collectionSnapshot=>{
		 const promises = collectionSnapshot.docs.map(doc=>doc.ref.delete())
		 Promise.all(promises)
			.then(()=>{
			 progressBar.visible = false
			 snackbar.open('Historico deletado com sucesso')
			})
			.catch(e=>{
			 progressBar.visible = false
			 console.error(e)
			 snackbar.open('Occoreu um erro desconhecido')
			})
		})
	},
	signOutUser(){
	 this.signOut = true
	 firebase.auth()
		.signOut()
		.then()
	},
	deleteAccount(){
	 progressBar.visible = true
	 this.signOut = true
	 const user = firebase.auth().currentUser;
	 user.delete()
		.catch(error=>{
		 if(error.code == "auth/requires-recent-login"){
			const provider = new firebase.auth
			 .GoogleAuthProvider();
			firebase.auth()
			 .signInWithPopup(provider)
			 .then(async({credential})=>{
				await firebase.auth().currentUser
				 .reauthenticateWithCredential(credential)
				firebase.auth().currentUser.delete()
			 })
		 }
		});
	}
 },
 mounted(){
	api.get('/version')
	 .then(response=>{
		this.version = response.data
	 })
	mdc.list.MDCList.attachTo(
	 document.querySelector('#screen-settings .mdc-list')
	)
	firebase.auth().onAuthStateChanged(user=>{
	 if(!user){
		if(this.signOut){
		 window.location.href ='/'
		}
		else{
		 window.location.href ='/login?sendTo=settings'
		}
	 }
	 else{
		document.querySelector('.load-initial').style.display = 'none'
		this.user = user
	 }
	})
 },
 template:`
 <div v-show='user.displayName' id='screen-settings' class='mdc-layout-grid mdc-layout-grid__inner'>
 <div style='display:flex;flex' class='mdc-layout-grid__cell mdc-layout-grid__cell--span-6'>
	 <img  v-bind:src='user.photoURL'/>
	 <div class='user-info'>{{user.displayName}}<br/>{{user.email}}</div>
	</div>
	<nav class="mdc-list mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
	 <a @click="deleteHistoryAll" class="mdc-list-item">
		<i class="material-icons mdc-list-item__graphic" aria-hidden="true">clear_all</i>
		<span class="mdc-list-item__text">Deletar todo Histórico</span>
	 </a>
	 <a @click="signOutUser" class="mdc-list-item">
		<i class="material-icons mdc-list-item__graphic" aria-hidden="true">exit_to_app</i>
		<span class="mdc-list-item__text">Sair</span>
	 </a>
	 <a @click="deleteAccount" class="mdc-list-item">
		<i class="material-icons mdc-list-item__graphic" aria-hidden="true">delete_forever</i>
		<span class="mdc-list-item__text">Deletar Conta</span>
	 </a>
	</nav>
	<span v-show='version.web' class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12" style='text-align:center'>Web Version {{version.web}}<br/>Server Version {{version.server}}</span>
 </div>
 `
})
