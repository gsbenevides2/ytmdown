const menu = new Vue({
 el:"#menu",
 data:{
	atual:null
 },
 methods:{
	to(screen){
	 this.mdc.open= false
	 if(screen !== this.atual){
		progressBar.visible = true
		const urls = {
		 dash:'',
		 hist:'history',
		 sett:'settings'
		}
		setTimeout(()=>{
		 window.location.href = `/${urls[screen]}`
		},1500)
	 }
	}
 },
 mounted(){
	console.log(true)
	switch(window.location.pathname){
	 case '/':
		this.atual = 'dash'
		break
	 case '/history':
		this.atual = 'hist'
		break
	 case '/settings':
		this.atual = 'sett'
		break
	}
	mdc.list.MDCList.attachTo(
	 document.querySelector('.mdc-drawer .mdc-list')
	).wrapFocus=true
	this.mdc = mdc.drawer.MDCDrawer.attachTo(
	 document.querySelector('.mdc-drawer')
	)
 },
 template:`
 <aside class="mdc-drawer mdc-drawer--dismissible">
	<div class="mdc-drawer__content">
	 <nav class="mdc-list">
		<a @click="to('dash')" 
		class="mdc-list-item"
		v-bind:class="{'mdc-list-item--activated':atual==='dash'}">
		 <i class="material-icons mdc-list-item__graphic" aria-hidden="true">music_note</i>
		 <span class="mdc-list-item__text">Baixar</span>
		</a>
		<a @click="to('hist')"
		class="mdc-list-item"
		v-bind:class="{'mdc-list-item--activated':atual==='hist'}">
		 <i class="material-icons mdc-list-item__graphic" aria-hidden="true">history</i>
		 <span class="mdc-list-item__text">Historico</span>
		</a>
		<a @click="to('sett')"
		class="mdc-list-item"
		v-bind:class="{'mdc-list-item--activated':atual==='sett'}">
		 <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
		 <span class="mdc-list-item__text">Configurações</span>
		</a>
	 </nav>
	</div>
 </aside>

 `
})
