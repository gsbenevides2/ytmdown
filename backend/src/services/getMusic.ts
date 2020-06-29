import { deezer } from './apis'

interface DeezerResponse{
  artist:{
    id:number;
    name:string;
  };
  title:string;
  contributors:Array<{
    id:number
    name:string;
  }>;
  album:{
    title:string;
    cover_xl:string;
  };
  track_position:string;
  release_date:string;

}

export default function (id:number) {
  return new Promise(resolve => {
    deezer.get({
      url: `/track/${id}`
    }, (error, response, body:DeezerResponse) => {
      if (!error) {
        const artist = body.artist.name
        let title = body.title
        const feats:Array<string> = []
        body.contributors.map(contributor => {
          if (contributor.id !== body.artist.id) {
            feats.push(contributor.name)
          }
        })
        if (feats.length !== 0) {
          title += ` (feat ${feats.join(', ')})`
        }
        const album = body.album.title
        const cover = body.album.cover_xl
        const number = parseInt(body.track_position)
        const year = parseInt(body.release_date.split('-')[0])
        resolve({ title, artist, album, number, year, cover })
      }
    })
  })
}
