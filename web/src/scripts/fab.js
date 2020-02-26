const fab = new Vue({
 el:"#fab",
 data:{
	visible:true,
	video:{}
 },
 methods:{
	click(){
	 if(urlScreen.visible){
		progressBar.visible = true
		this.visible = false
		fetch(`/album?url=${urlScreen.url}`)
		 .then(async res=>{
			this.video= await res.data
			albumsScreen.albums = this.video.albumResults
			urlScreen.visible = false
			topAppBar.navigationIcon = "arrow_back"
			albumsScreen.visible = true
			progressBar.visible = false
		 })
		 .catch(error=>{
			console.log()
			this.visible=true
			progressBar.visible = false
			urlScreen.invalid(error.request.responseText || error.message)
		 })
	 }
	}
 },
 mounted(){
	mdc.ripple.MDCRipple.attachTo(this.$el)
 },
 template:`
 <button v-bind:class="{'mdc-fab-hide':!visible}" @click="click" class="mdc-fab">
	<div class="mdc-fab__ripple"></div>
	<span class="mdc-fab__icon material-icons">arrow_forward</span>
 </button>
 `
})
