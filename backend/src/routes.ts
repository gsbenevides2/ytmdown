import express from 'express'
import * as validations from './validations'

import videoController from './controllers/videoController'
import musicController from './controllers/musicController'
import musicsController from './controllers/musicsController'
import lyricsController from './controllers/lyricsController'
import downloadController from './controllers/downloadController'
const routes = express.Router()

/*
 * video
 * musica
 * letra
*/

routes.get('/video',
  validations.video,
  videoController.index)

routes.get('/music',
  validations.music,
  musicController.index)

routes.get('/musics',
  validations.musics,
  musicsController.index)

routes.get('/lyrics',
  validations.lyrics,
  lyricsController.index)

routes.get('/download/:id.mp3',
  downloadController.index)

export default routes
