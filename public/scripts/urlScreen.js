const urlScreen = new Vue({
 el:"#urlScreen",
 data:{
	visible:true,
	url:null,
	errorText:"",
	error:false,
	invalid(msg){
	 this.errorText=msg
	 this.error=true
	 this.mdcInput.valid = false
	}
 },
 methods:{
	disableError(){
	 this.errorText = ""
	},
	copyFromClipboard(){
	 navigator.clipboard.readText()
		.then(text=>{
		 this.url = text
		 this.mdcInput.focus()
		})
		.catch(error=>{
		 console.log(error)
		})
	}
 },
 mounted(){
	this.mdcInput = new mdc.textField.MDCTextField(this.$refs.urlInputContainer)
 },
 template:`
 <div v-show="visible" class="screen">
	<div ref="urlInputContainer" class="mdc-text-field">
	 <input @keyup.enter="fab.click" @blur="disableError" v-model="url" id="urlInput" class="mdc-text-field__input" type="text"/>
	 <label class="mdc-floating-label" for="urlInput">Insira a url</label>
	 <div class="mdc-line-ripple"></div>
	</div>
	<div class="mdc-text-field-helper-line mdc-text-field-helper-text--persistent">
	 <div style="color:var(--mdc-theme-error,#b00020);;"  class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
	 {{errorText}}
	 </div>
	</div>
	<div style="text-align:right;">
	 <button @click="copyFromClipboard" style="display:inline" class="mdc-icon-button material-icons">content_paste</button>
	</div>
 </div>
 `
})
