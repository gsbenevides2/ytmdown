const fab=new Vue({el:"#fab",data:{visible:!0,video:{}},methods:{click(){urlScreen.visible&&(progressBar.visible=!0,this.visible=!1,fetch(`/album?url=${urlScreen.url}`).then(async e=>{if(200!==e.status){const i=await e.text();throw new Error(i)}this.video=await e.json(),albumsScreen.albums=this.video.albumResults,urlScreen.visible=!1,topAppBar.navigationIcon="arrow_back",albumsScreen.visible=!0,progressBar.visible=!1}).catch(e=>{this.visible=!0,progressBar.visible=!1,urlScreen.invalid(e.message)}))}},mounted(){mdc.ripple.MDCRipple.attachTo(this.$el)},template:'\n <button v-bind:class="{\'mdc-fab-hide\':!visible}" @click="click" class="mdc-fab">\n\t<div class="mdc-fab__ripple"></div>\n\t<span class="mdc-fab__icon material-icons">arrow_forward</span>\n </button>\n '});