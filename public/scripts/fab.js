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
			if(res.status === 200){
			 this.video= await res.json()
			 albumsScreen.albums = this.video.albumResults
			 urlScreen.visible = false
			 topAppBar.navigationIcon = "arrow_back"
			 albumsScreen.visible = true
			}
			else{
			 const text = await res.text()
			 throw new Error(text)
			}
			progressBar.visible = false
		 })
		 .catch(error=>{
			this.visible=true
			progressBar.visible = false
			urlScreen.invalid(error.message)
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
