Vue.component('lyrics-view',{
 props:{
	lyrics:{default:[]},
	translation:{default:[]},
	show:{default:0}
 },
 mounted(){
	const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
	tabBar.listen('MDCTabBar:activated',e=>{
	 this.show = e.detail.index
	})
 },
 template:`
 <div>
	<div class="mdc-tab-bar" role="tablist">
	 <div class="mdc-tab-scroller">
		<div class="mdc-tab-scroller__scroll-area">
		 <div class="mdc-tab-scroller__scroll-content">
			<button class="mdc-tab mdc-tab--active" tabindex="0">
			 <span class="mdc-tab__content">
				<span class="mdc-tab__icon material-icons">subtitles</span>
				<span class="mdc-tab__text-label">Original</span>
			 </span>
			 <span class="mdc-tab-indicator mdc-tab-indicator--active">
				<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
			 </span>
			 <span class="mdc-tab__ripple"></span>
			</button>
			<button class="mdc-tab" tabindex="1">
			 <span class="mdc-tab__content">
				<span class="mdc-tab__icon material-icons">g_translate</span>
				<span class="mdc-tab__text-label">Tradução</span>
			 </span>
			 <span class="mdc-tab-indicator">
				<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
			 </span>
			 <span class="mdc-tab__ripple"></span>
			</button>
		 </div>
		</div>
	 </div>
	</div>
	<span class="lyrics" v-for="(lyric) in (show===0?lyrics:translation)">
	 <span class="original">{{lyric}}</span>
	</span>
 </div>
 `
})
