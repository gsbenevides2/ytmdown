import { Request, Response } from 'express'
import getLyricsFromMusic from '../services/getLyricsFromMusic'

class LyricsController {
  index (request:Request, response:Response) {
    const { musicName, artist } = request.query

    getLyricsFromMusic(musicName as string, artist as string)
      .then(data => {
        response.json(data)
      })
      .catch(err => {
        response.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: err.message
        })
      })
  }
}

export default new LyricsController()
