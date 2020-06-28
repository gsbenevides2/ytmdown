import FFmpeg, { FfmpegCommandLogger } from 'fluent-ffmpeg'
import ffmpegOnProgress from 'ffmpeg-on-progress'
import fs from 'fs'
import path from 'path'
type LogType = {
  type:'Progress' | 'Error' | 'Success';
  message:string;
}
type CallbackType = (log:LogType)=>void;

FFmpeg.setFfmpegPath(process.env.FFMPEG_PATH as string)

function convertAudioFile (id:string, filePath:string, audioBitrate:number, callback:CallbackType):void {
  const fileConvertedPath = path.resolve(__dirname, '..', '..', 'downloads', `${id}_converted.mp3`)
  const writeStream = fs.createWriteStream(fileConvertedPath)
  FFmpeg()
    .input(filePath)
    .audioBitrate(audioBitrate)
    .withAudioCodec('libmp3lame')
    .toFormat('mp3')
    .outputOptions(['-id3v2_version', '4'])
    .on('progress', ffmpegOnProgress((percent:number) => {
      const percentage = `${(percent * 100).toFixed(2)}%`
      callback({
        type: 'Progress',
        message: percentage
      })
    }))
    .on('error', (err:FfmpegCommandLogger) => {
      console.error(err)
      callback({
        type: 'Error',
        message: 'Erro desconhecido.'
      })
    })
    .on('end', () => {
      callback({
        type: 'Success',
        message: fileConvertedPath
      })
    })
    .writeToStream(writeStream, { end: true })
}
export default convertAudioFile
