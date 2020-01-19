const albumsScreen=new Vue({el:"#albumsScreen",data:{visible:!1,musicName:"",albums:[]},methods:{selectMusic(t){progressBar.visible=!0,fetch(`/music?id=${t}`).then(async t=>{if(200!==t.status){const e=await t.text();throw new Error(e)}{const e=await t.json();albumsScreen.visible=!1,albumScreen.visible=!0,albumScreen.music=e}progressBar.visible=!1}).catch(t=>{progressBar.visible=!1,alert(`Ocorreu um erro:${t.message}`)})},search(){progressBar.visible=!0,fetch(`/album?url=${urlScreen.url}&searchTerm=${this.musicName}`).then(async t=>{if(200!==t.status){const e=await t.text();throw new Error(e)}fab.video=await t.json(),this.albums=fab.video.albumResults,progressBar.visible=!1}).catch(t=>{progressBar.visible=!1,alert(t.message)})}},mounted(){mdc.textField.MDCTextField.attachTo(this.$refs.musicName)},template:'\n\t<div v-show="visible" class="screen">\n\t <div v-show="albums.length === 0">\n\t\t<h4 class="mdc-typography--headline6">Por favor digite o nome da música:</h4>\n\t\t<div ref="musicName" class="mdc-text-field">\n\t\t <input @keyup.enter="search"  v-model="musicName" id="musicName" class="mdc-text-field__input"/>\n\t\t <label for="musicName" class="mdc-floating-label">Nome da música</label>\n\t\t <div class="mdc-line-ripple"></div>\n\t\t</div>\n\t </div>\n\t <ul style="padding:0">\n\t\t<li v-for="music in albums" @click="selectMusic(music.id)" class="mdc-card" style="width:100%; margin-bottom:10px;">\n\t\t <div class="mdc-card__primary-action" style="display:flex;flex-direction:row;">\n\t\t\t<div class="mdc-card__media mdc-card__media--square" style="flex:0 0 150px !important;" v-bind:style="{backgroundImage:\'url(&quot;\'+music.cover+\'&quot;)\'}"></div>\n\t\t\t<div style="padding:12px;">\n\t\t\t <h2 class="mdc-typography--headline6">{{music.title}}</h2>\n\t\t\t <h3 class="mdc-typography--subtitle2">{{music.artist}} - {{music.album}}</h3>\n\t\t\t</div>\n\t\t </div>\n\t\t</li>\n\t </ul>\n\t</div>\n\t'});