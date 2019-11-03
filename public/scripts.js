eruda.init()
const pages = {}
$(document).ready(()=>{
 pages.album = $("#page-album")
 pages.form = $("#page-form")
 pages.progress = $("#page-progress")
 pages.letra = $("#page-letra")
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
 musicData= null
 const aguardeAnimacao = ()=>{return new Promise(resolve=>{
	setTimeout(()=>{
	 pages.form.hide()
	 progressScreen("Aguarde")
	 resolve()
	},1000)
 })}
 await aguardeAnimacao()
 const input = $("#url")
 if(!input.val()){
	pages.progress.hide()
	pages.form.show()
	input.parent().addClass("invalid")
	pages.form.find("button").blur()
	alert("Insira uma url!")
	return false;
 }
 else{
	input.parent().removeClass("invalid")
 }
 const response = await $.get("/urlYoutube",{url:input.val()})
 if(!response.urlIsValid){
	input.parent().addClass("invalid")
	alert(response.errorMessage)
	pages.progress.hide()
	pages.form.show()
	pages.form.find("button").blur()
	return false;
 }
 else{
	musicData = response.musicData
	const html = musicData.albumsImages.map((music,key)=>{
	 return `<li key="${key}" id="album${key}" oncllick="selectAlbum(${key})"><img onclick="selectAlbum(${key})" src="${music}"/></li>`
	}).join("")
	$(".albumSelector").html(html)
	pages.progress.hide()
	pages.album.show()
 }
}
function fabAlbum(){
 const albumElement = returnSelectedAlbumElement()
 if(albumElement.length){
	musicData.albumSelected = parseInt(albumElement.attr("key"))
	$("#letra").html(musicData.lyrics.split("\n").join("<br/>"))
	pages.letra.show()
	pages.album.hide()

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
 musicData.letraIsValid = isValid
 var socket = io(window.location.href)
 socket.emit("download",musicData)
 pages.letra.hide()
 progressScreen("Carregando")
 socket.on("downloadProgress",progressScreen)
 socket.on("downloadErro",(msg)=>{
	pages.progress.hide()
	pages.form.show()
	alert(msg)
	socket.close()
 })
 socket.on("downloadSucess",()=>{
	const a = document.createElement("a")
	a.style.display="none"
	document.body.appendChild(a)
	a.href=`${window.location.href}music/${musicData.id}.mp3`
	a.setAttribute("download",`${musicData.id}.mp3`)
	a.click()
	window.URL.revokeObjectURL(a.href);
	document.body.removeChild(a);
	progressScreen("Concluido")
	setTimeout(()=>{
	 pages.progress.hide()
	 pages.form.show()
	})
	socket.close()
 })
}
function toHome(){
 window.location.reload()
}
function darkMode(){
 $(document.body).toggleClass("dark")
}
function areaDeTransferencia(){
 navigator.clipboard.readText().then(text=>{
	$("#url").val(text)
	$("#url").parent().addClass("input-focus")
 })
}
