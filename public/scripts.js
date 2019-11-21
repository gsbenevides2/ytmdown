const pages = {}
$(document).ready(()=>{
 pages.album = $("#page-album")
 pages.form = $("#page-form")
 pages.progress = $("#page-progress")
 pages.letra = $("#page-letra")
 pages.traducao = $("#page-traducao")
 navigator.serviceWorker.register("/sw.js")
 if(localStorage.getItem("darkMode") === "true"){
	$(document.body).addClass("dark")
 }
 const url = new URL(window.location.href)
 if(url.searchParams.has("text")){
	$("#url").parent().addClass("input-focus")
	$("#url").val(url.searchParams.get("text"))
 }
 const inputsDiv = $(".input")
 for(let inputDiv of inputsDiv){
	const input = $(inputDiv).find("input")
	input.on("focus",(e)=>{
	 $(e.target.parentNode).removeClass("invalid")
	 $(e.target.parentNode).addClass("input-focus")
	})
	input.on("blur",(e)=>{
	 if(!e.target.value){
		$(e.target.parentNode).removeClass("input-focus")
	 }
	})
 }
})
function returnSelectedAlbumElement(){
 return $(".albumSelector .selected")
}
let musicData
function selectAlbum(key){
 returnSelectedAlbumElement().removeClass("selected")
 const albumElement = $(`.albumSelector #album${key}`)
 albumElement.addClass("selected")
}
function albumSubmit(){
 const id = returnSelectedAlbumElement().id
 const album = musicData.filter((music,key)=>`album${key}` === id)
 console.log(album)
}
async function urlInput(){
 if(!navigator.onLine){
	alert("Opaaa. parece que você esta offline!")
	return false
 }
 const trace = firebase.performance().trace("urlBackEnd")
 trace.start()
 musicData= null
 const aguardeAnimacao = ()=>{return new Promise(resolve=>{
	setTimeout(()=>{
	 pages.form.fadeOut(400,()=>{progressScreen("Aguarde");resolve()})
	},1000)
 })}
 await aguardeAnimacao()
 const input = $("#url")
 if(!input.val()){
	pages.progress.fadeOut(400,()=>pages.form.fadeIn(400))
	//pages.form.fadeIn()
	input.parent().addClass("invalid")
	pages.form.find("button").blur()
	alert("Insira uma url!")
	trace.stop()
	return false;
 }
 else{
	input.parent().removeClass("invalid")
 }
 const response = await $.get("/urlYoutube",{url:input.val()})
 if(!response.urlIsValid){
	input.parent().addClass("invalid")
	alert(response.errorMessage)
	pages.progress.fadeOut(400,()=>pages.form.fadeIn(400))
	pages.form.find("button").blur()
	trace.stop()
	return false;
 }
 else{
	musicData = response.musicData
	if(musicData.albumsImages.length!==0){
	 const html = musicData.albumsImages.map((music,key)=>{
		return `<li key="${key}" id="album${key}" oncllick="selectAlbum(${key})"><img onclick="selectAlbum(${key})" src="${music}"/></li>`
	 }).join("")
	 $(".albumSelector").html(html)
	 pages.progress.fadeOut(400,()=>pages.album.fadeIn(400))
	 //pages.album.show()
	}
	else{
	 pages.progress.hide()
	 pages.album.hide()
	 alert("Nao foi encontrada as fotos do album")
	 fabAlbum(true)
	}
	trace.stop()
	return false
 }
}
function fabAlbum(ignoreAlbum){
 const albumElement = returnSelectedAlbumElement()
 if(albumElement.length || ignoreAlbum){
	musicData.albumSelected = ignoreAlbum ? false : parseInt(albumElement.attr("key"))
	if(musicData.lyrics){
	 $("#letra").html(musicData.lyrics.split("\n").join("<br/>"))
	 pages.letra.show()
	 pages.album.hide()
	}
	else{
	 alert("Não foi possivel encontrar as letras")
	 pages.album.hide()
	 letraSubmit(false)
	}

 }
 else{
	alert("Selecione um album")
	pages.album.find(".fab").blur()
 }
}
function progressScreen(information){
 pages.progress.show()
 pages.progress.find("h4").html(information)
}

function letraSubmit(isValid){
 $(document.body).scrollTop(0)
 if(isValid){
	firebase.analytics().logEvent('letraValida');
 }
 else{
	firebase.analytics().logEvent('letraInvalida');
 }
 musicData.letraIsValid = isValid
 if(musicData.traslation){
	pages.traducao.fadeIn()
	pages.letra.fadeOut()
	pages.traducao.find("p").html(musicData.traslation.split("\n").join("<br/>"))
 }
 else{
	alert("Não foi possivel encontrar a tradução")
	pages.letra.fadeOut()
	traducaoSubmit(false)
 }
}
function traducaoSubmit(isValid){
 if(isValid){
	firebase.analytics().logEvent("traducaoValida")
 }else{
	firebase.analytics().logEvent("traducaoInvalida")
 }
 const trace = firebase.performance().trace("backProcess")
 musicData.traducaoIsValid = isValid
 var socket = io(window.location.href)
 socket.emit("download",musicData)
 pages.traducao.hide()
 progressScreen("Carregando")
 socket.on("downloadProgress",progressScreen)
 socket.on("downloadErro",(msg)=>{
	pages.progress.hide()
	pages.form.show()
	alert(msg)
	trace.stop()
	socket.close()
 })
 socket.on("downloadSucess",()=>{
	window.open(`/music/${musicData.id}.mp3`)
	progressScreen("Concluido")
	setTimeout(()=>{
	 pages.progress.hide()
	 pages.form.show()
	})
	trace.stop()
	socket.close()
 })
}
function toHome(){
 window.location.reload()
}
function darkMode(){
 $(document.body).toggleClass("dark")
 if($(document.body).hasClass("dark")){
	firebase.analytics().setUserProperties({darkMode: true});
	localStorage.setItem("darkMode",true)
 }
 else{
	firebase.analytics().setUserProperties({darkMode:false});
	localStorage.setItem("darkMode",false)
 }

}
function areaDeTransferencia(){
 navigator.clipboard.readText()
	.then(text=>{
	 $("#url").val(text)
	 $("#url").parent().addClass("input-focus")
	})
	.catch(erro=>{
	 alert("Ocorreu um erro ao copiar da Area de Transferencia")
	})
}
