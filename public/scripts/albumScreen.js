const albumScreen = new Vue({
 el:"#albumScreen",
 data:{
	visible:false,
	music:{}
 },
 template:`
 <div v-show="visible" class="mdc-card mdc-card--outlined screen">
	<div class="mdc-card__primary-action">
	 <div class="mdc-card__media mdc-card__media--square" v-bind:style="{backgroundImage:'url(&quot;'+music.cover+'&quot;)'}"></div>
	 <div style="padding:12px;">
		<h2 class="mdc-typography--headline6">{{music.name}}</h2>
		<p class="mdc-typography--body1">
		Artista:{{music.artist}}<br/>
		Album:{{music.album}}<br/>
		Numero da faixa:{{music.number}}<br/>
		Ano:{{music.year}}<br/>
		</p>
	 </div>
	 <div class="mdc-card__actions">
	  <div class="mdc-card__action-icons">
		 <button class="mdc-button">Alterar</button>
		 <button class="mdc-button">Continuar</button>
		</div>
	 </div>
	</div>
 </div>
 `
})
