import {deezer} from './apis'

type DeezerResult = {
 id:number;
 title:string;
 artist:{
	name:string;
 };
 album:{
	title:string;
	cover_medium:string;
 }
}

type ResultType =  {
 musics:[];
 next:number | undefined
}

export default function(searchTerm:string,index?:number):Promise<ResultType>{
 return new Promise((resolve,reject)=>{
	deezer.get({
	 url:'/search',
	 qs:{
		q:searchTerm,
		index
	 }
	},(error,response,body)=>{
	 if(error){
		reject('Unknown error')
	 }
	 else{
		let {data, next} = body
		const musics = data.map((music:DeezerResult)=>{
		 return {
			id:music.id,
			title:music.title,
			artist:music.artist.name,
			album:music.album.title,
			cover:music.album.cover_medium
		 }
		})
		if(next){
		 next = Number(
			(new URL(next)).searchParams.get('index')
		 )
		}
		resolve({musics,next})
	 }
	})
 })
}
