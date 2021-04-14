import ytdl from 'ytdl-core'
import getMusicFromSearchTerm from './getMusicsFromSearchTerm'

function getSearchTermFromVideo (videoUrl: string): Promise<string> {
  function sanitizerDescription (description: string) {
    const lines = description.split('\n')
    const thirdRow = lines[2] || ''
    const [name, artist] = thirdRow.split(' · ')
    if (artist) return `${name} - ${artist}`
    else return null
  }
  function sanitizerTitle (title: string) {
    const standards = [
      /\(((.)+)?\)/gm, // Rmmove ()
      /\[((.)+)?\]/gm, // Remove []
      /\#([a-zA-Z]+)/gm, // Remove #
      'Oficial',
      'OFICIAL',
      'Official MV',
      'Official',
      'OFFICIAL',
      '"',
      "'"
    ]
    let sanitizedTitle = title
    standards.map(standard => {
      sanitizedTitle = sanitizedTitle.replace(standard, '')
    })
    return sanitizedTitle
  }
  return new Promise((resolve, reject) => {
    ytdl.getInfo(videoUrl)
      .then(resultNew => {
        const result = resultNew.videoDetails
        let searchTerm = sanitizerDescription(result.description as string)
        if (!searchTerm) searchTerm = sanitizerTitle(result.title)
        resolve(searchTerm)
      })
      .catch(reject)
  })
}

export default function (videoUrl: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const searchTerm = await getSearchTermFromVideo(videoUrl)
      const { musics, next } = await getMusicFromSearchTerm(searchTerm)
      resolve({ musics, next, searchTerm })
    } catch (e) {
      console.log(e)
      reject(e.message)
    }
  })
}
