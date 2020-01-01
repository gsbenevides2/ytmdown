const progressBar = new Vue({
 el:"#progressBar",
 data:{
	visible:false,	
	inderteminate:true
 },
 mounted(){
	this.mdc = new mdc.linearProgress.MDCLinearProgress(this.$el)
 },
 template:`
 <div v-bind:style="{opacity:visible?1:0}"
 class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-top-app-bar--fixed-adjust">
	<div class="mdc-linear-progress__buffering-dots"></div>
	<div class="mdc-linear-progress__buffer"></div>
	<div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
	 <span class="mdc-linear-progress__bar-inner"></span>
	</div>
	<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
	 <span class="mdc-linear-progress__bar-inner"></span>
	</div>
 </div>
 `
})
