const settingsScreen = new Vue({
 el:'.screen',
 data:{
	user:{}
 },
 methods:{
	deleteHistoryAll(){}
 },
 mounted(){
	mdc.list.MDCList.attachTo(
	 document.querySelector('#screen-settings .mdc-list')
	)
	firebase.auth().onAuthStateChanged(user=>{
	 if(!user) window.location.href ='/login?sendTo=settings'
	 else{
		document.querySelector('.load-initial').style.display = 'none'
		this.user = user
	 }
	})
 },
 template:`
 <div id='screen-settings' class='mdc-layout-grid mdc-layout-grid__inner'>
	<div class='mdc-layout-grid__cell mdc-layout-grid__cell--span-4'>
	 <img v-bind:src='user.photoURL'/>
		<div class='user-info'>{{user.displayName}}<br/>{{user.email}}</div>
	</div>
	<nav class="mdc-list mdc-layout-grid__cell">
	 <a @click="deleteHistoryAll" class="mdc-list-item">
		<i class="material-icons mdc-list-item__graphic" aria-hidden="true">music_note</i>
		<span class="mdc-list-item__text">Deletar todo Histórico</span>
	 </a>
	</nav>
 </div>
 `
})
