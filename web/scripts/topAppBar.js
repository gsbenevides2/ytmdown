const topAppBar = new Vue({
 el:"#topAppBar",
 data:{
	navigationIcon:"",
	darkMode:false
 },
 methods:{
	navigationClick(){
	 if(this.navigationIcon === "arrow_back"){
		if(progressBar.visible){
		 alert("Aguarde o termino do processo")
		}
		else if(albumsScreen.visible){
		 albumsScreen.visible = false
		 urlScreen.visible = true
		 fab.visible = true
		 this.navigationIcon = ""
		}
		else if(albumScreen.visible){
		 albumScreen.visible = false
		 albumsScreen.visible = true
		}
		else if(lyricsScreen.visible){
		 lyricsScreen.visible = false
		 albumScreen.visible= true
		}
		else if(loadingScreen.visible){
		 loadingScreen.visible = false
		 loadingScreen.downloadUrl = null
		 loadingScreen.loadingText = "Carregando"
		 loadingScreen.$refs.lottie.load(loadingScreen.lottie.loading)
		 loadingScreen.$refs.lottie.loop = true	
		 urlScreen.visible = true
		 this.navigationIcon = ""
		 fab.visible = true

		}
	 }
	},
	toggleDarkMode(){
	 document.body.classList[this.darkMode?'remove':'add']("dark")
	 this.darkMode = !this.darkMode
	 localStorage.setItem("darkMode",this.darkMode)
	},
	home(){
	 window.location.href = "/"
	}
 },
 mounted(){
	if(localStorage.getItem("darkMode") === "true") this.toggleDarkMode()
	document.querySelectorAll(".mdc-top-app-bar buttons")
	 .forEach(el=>{
		mdc.ripple.MDCRipple.attachTo(el).unbounded=true
	 })
 },
 template:`
 <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
	<div class="mdc-top-app-bar__row">
	 <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
		<button v-show="navigationIcon" @click="navigationClick" class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">{{navigationIcon}}</button>  
		<span @click="home" class="mdc-top-app-bar__title">YouTube Music Downloader</span>
	 </section>
	 <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
		<button @click="toggleDarkMode" class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Download">{{darkMode? 'brightness_low' :'brightness_2'}}</button>
	 </section>
	</div>
 </header>
 `
})
