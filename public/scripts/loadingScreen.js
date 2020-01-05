const loadingScreen = new Vue({
 el:"#loadingScreen",
 data:{
	visible:false,
	loadingText:"Carregando",
	downloadUrl:null
 },
 methods:{
	event(data){
	 if(data.type==='Log'){
		this.loadingText=data.message
	 }
	 if(data.type === "Success"){
		progressBar.visible = false
		this.$refs.lottie.load("https://assets8.lottiefiles.com/datafiles/jEgAWaDrrm6qdJx/data.json")
		this.$refs.lottie.loop=false
		this.loadingText= "Sucesso"
		this.downloadUrl=`/music/${data.id}.mp3`
	 }
	}
 },
 template:`
 <div v-show="visible" style="text-align:center">
	<lottie-player
		ref="lottie"
		src="https://assets7.lottiefiles.com/temp/lf20_aiGIon.json"
		background="transparent"
		speed="1"
		style="width:300px;height:300px;display:inline-block;"
		loop autoplay>
	</lottie-player>
	<p>{{loadingText}}</p>
	<a download v-bind:href="downloadUrl" class="mdc-button" v-show="downloadUrl">Baixar musica</a>
	</div>
	`
})
