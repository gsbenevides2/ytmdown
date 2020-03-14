firebase.auth()
const loadingScreen = new Vue({
 el:".screens #loading",
 data:{
	visible:false,
	loadingText:"Carregando",
	downloadUrl:null,
	error:false,
	lottie:{}
 },
 methods:{
	async downloadStart(musicData){
	 this.musicData = musicData
	 this.$refs.lottie.load(this.lottie.loading)
	 this.error = false
	 this.socket = io(makeUrl());
	 progressBar.visible = true
	 this.visible = true
	 const data = {musicData}
	 if(firebase.auth().currentUser){
		try{
		 const authToken = await firebase.auth().currentUser.getIdToken(false)
		 data.authToken = authToken
		}
		catch(e){
		 console.error(e)
		}
	 }
	 if(topAppBar.notificationMode){
		data.messagingToken = topAppBar.messagingToken
	 }
	 this.socket.emit("downloadMusic",data)
	 this.socket.on("event",eventData=>{
		this.event(eventData)
	 })
	},
	event(data){
	 if(data.type==='Log'){
		this.loadingText=data.message
	 }
	 else if(data.type === "Success"){
		progressBar.visible = false
		this.$refs.lottie.load(this.lottie.success)
		this.$refs.lottie.loop=false
		this.loadingText= "Sucesso"
		this.downloadUrl=`${makeUrl()}music/${data.id}.mp3`
	 }
	 else if(data.type==="Error"){
		progressBar.visible = false
		this.$refs.lottie.load(this.lottie.error)
		this.$refs.loop=false
		this.loadingText="Erro"
		this.error = true
		this.socket.disconnect()
	 }
	}
 },
 mounted(){
	api("https://assets7.lottiefiles.com/temp/lf20_aiGIon.json")
	 .then(async response=>{
		this.lottie.loading = response.data
		this.$refs.lottie.load(this.lottie.loading)
	 })
	api("https://assets2.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json")
	 .then(async response=>{
		this.lottie.success =  response.data
	 })
	api("https://assets8.lottiefiles.com/packages/lf20_eKtxVc.json")
	 .then(async response=>{
		this.lottie.error =  response.data
	 })

 },
 template:`
	<div v-show="visible" style="text-align:center">
	<lottie-player
	ref="lottie"
	background="transparent"
	speed="1"
	style="width:300px;height:300px;display:inline-block;"
	loop autoplay>
	</lottie-player>
	<p>{{loadingText}}</p>
	<a download v-bind:href="downloadUrl" class="mdc-button" v-show="downloadUrl">Baixar musica</a>

	<button v-show="error" @click="downloadStart(musicData)" class="mdc-button">Tentar Novamente</a>
	</div>
	`
})
