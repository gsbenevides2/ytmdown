import axios from 'axios'
import path from 'path'
import fs from 'fs'

import progress from 'progress-stream'

type LogType = {
  type:'Log' | 'Error' | 'Success';
  message:string;
}
type CallbackType = (log:LogType)=>void;
function download (url:string, filename:string, callback:CallbackType):void {
  const filePath = path.resolve(__dirname, '..', '..', 'downloads', filename)
  const file = fs.createWriteStream(filePath)

  axios({
    url,
    method: 'GET',
    responseType: 'stream'
  }).then(request => {
    const length = request.headers['content-length']
    const progressHandler = progress({
      length,
      time: 10
    })
    progressHandler.on('progress', progress => {
      callback({
        type: 'Log',
        message: Math.round(progress.percentage) + '%'
      })
    })

    request.data
      .pipe(progressHandler)
      .pipe(file)

    file.on('finish', () => {
      callback({
        type: 'Success',
        message: filePath
      })
    })
  })
}

export default download
