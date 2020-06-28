import { vagalume } from './apis'

interface Result {
  lyrics:string;
  translation?:string;
}

interface VagalumeResponse {
  type:string;
  mus:Array<{
    text:string;
    translate?:Array<{
      lang:number;
      text:string;
    }>
  }>
}

export default function (musicName:string, artist:string):Promise<Result> {
  return new Promise((resolve, reject) => {
    vagalume.get({
      url: '/search.php',
      qs: {
        mus: musicName,
        art: artist
      }
    }, (error, response, body:VagalumeResponse) => {
      try {
        if (error) {
          return reject(new Error('Unknown error'))
        }
        if (body.type.match('notfound')) {
          return reject(new Error('Not Found'))
        }
        const lyrics = body.mus[0].text
        let translation
        if (body.mus[0].translate) {
          translation = body
            .mus[0]
            .translate
            .find(translation => translation.lang === 1)
            ?.text
        }
        resolve({ translation, lyrics })
      } catch (e) {
        reject(new Error('Unknown error'))
      }
    })
  })
}
