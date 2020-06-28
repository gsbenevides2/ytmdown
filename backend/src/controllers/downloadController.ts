import { Request, Response } from 'express'
import path from 'path'

class DownloadController {
  index (request:Request, response:Response) {
    const filePath = path.resolve(__dirname, '..', '..', 'downloads', `${request.params.id}_converted.mp3`)
    response.download(filePath)
  }
}

export default new DownloadController()
