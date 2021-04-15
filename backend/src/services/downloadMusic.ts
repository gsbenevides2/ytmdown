import ytdl, { videoFormat } from 'ytdl-core'
import downloadFile from '../utils/downloadFile'
import convertAudioFile from '../utils/convertAudioFile'
import nodeId3, { Tags } from 'node-id3'
import Sentry from '../sentry'

interface TagsInterface extends Tags {
	APIC: string;
}
interface MusicData {
	album: string;
	artist: string;
	title: string;
	cover: string;
	number: number;
	year: number
	url: string;
	lyrics: string | null;
	translation: string | null;
}
type LogType = {
	type: 'Log' | 'Error' | 'Success';
	message: string;
}
type CallbackType = (log: LogType) => void;

function downloadCompleteMusic (data: MusicData, id: string, callback: CallbackType): void {
  let musicFilePath = ''
  let coverFilePath = ''
  let musicYoutubeData: videoFormat

  function getMusicInfo () {
    callback({
      type: 'Log',
      message: 'Obtendo url de download...'
    })
    return new Promise((resolve, reject) => {
      ytdl.getInfo(data.url).catch(err => {
        Sentry.captureEvent(err)
        console.log(err)
        reject(
          new Error('Erro ao obter informações')
        )
      }).then(info => {
        if (info) {
          musicYoutubeData = info.formats.filter(ele => ele?.mimeType?.includes('audio/mp4'))[0]
          resolve()
        } else {
          reject(
            new Error('Erro ao obter informações'))
        }
      })
    })
  }

  function downloadMusic () {
    callback({
      type: 'Log',
      message: 'Baixando música...'
    })
    return new Promise((resolve, reject) => {
      downloadFile(musicYoutubeData.url, `${id}_pure.mp3`, log => {
        if (log.type === 'Log') {
          callback({
            type: 'Log',
            message: 'Baixando música...' + log.message
          })
        } else if (log.type === 'Success') {
          musicFilePath = log.message
          resolve()
        } else {
          reject(
            new Error('Erro ao baixar música.')
          )
        }
      })
    })
  }

  function downloadCover () {
    callback({
      type: 'Log',
      message: 'Baixando capa do album...'
    })
    return new Promise((resolve, reject) => {
      downloadFile(data.cover, `${id}.jpg`, log => {
        if (log.type === 'Log') {
          callback({
            type: 'Log',
            message: 'Baixando capa do album...' + log.message
          })
        } else if (log.type === 'Success') {
          coverFilePath = log.message
          resolve()
        } else {
          reject(
            new Error('Erro ao baixar capa.')
          )
        }
      })
    })
  }

  function convertFile () {
    callback({
      type: 'Log',
      message: 'Convertendo arquivo de música...'
    })
    return new Promise((resolve, reject) => {
      convertAudioFile(id, musicFilePath, musicYoutubeData.audioBitrate as number, log => {
        if (log.type === 'Progress') {
          callback({
            type: 'Log',
            message: 'Convertendo arquivo de música...' + log.message
          })
        } else if (log.type === 'Success') {
          musicFilePath = log.message
          resolve()
        } else {
          reject(
            new Error('Erro ao converter arquivo de música.')
          )
        }
      })
    })
  }

  function applyId3Data () {
    callback({
      type: 'Log',
      message: 'Adicionando tags...'
    })
    return new Promise((resolve, reject) => {
      const tags: TagsInterface = {
        title: data.title,
        artist: data.artist,
        album: data.album,
        APIC: coverFilePath,
        year: data.year,
        trackNumber: String(data.number)
      }
      if (data.lyrics || data.translation) {
        tags.unsynchronisedLyrics = {
          language: 'eng',
          text: `${data.lyrics || ''}\n${data.translation || ''}`
        }
      }
      const success = nodeId3.write(tags, musicFilePath)
      if (success) resolve()
      else {
        reject(
          new Error('Ocoreu um erro desconhecido ao inserir as tags')
        )
      }
    })
  }

  getMusicInfo()
    .then(downloadMusic)
    .then(downloadCover)
    .then(convertFile)
    .then(applyId3Data)
    .then(() => {
      callback({
        type: 'Success',
        message: id
      })
    })
  // .then(convertFile)
    .catch(error => {
      Sentry.captureException(error)
      callback({
        type: 'Error',
        message: error.message
      })
    })
}
export default downloadCompleteMusic
