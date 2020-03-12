const snackbar = new Vue({
 el:'#snackbar',
 methods:{
	open(msg){
	 this.mdc.labelText = msg
	 this.mdc.open()
	}
 },
 mounted(){
	this.mdc = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'))
 },
 template:`
 <div class="mdc-snackbar">
  <div class="mdc-snackbar__surface">
   <div class="mdc-snackbar__label"></div>
  </div>
 </div>
 `
})
