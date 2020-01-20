const {Router} = require("express")

const AlbumController = require("./controllers/album")
const MusicController = require("./controllers/music")
const LyricsController = require("./controllers/lyrics")

const routes = Router()

routes.get("/album",AlbumController.index)
routes.get("/music",MusicController.index)
routes.get("/lyrics",LyricsController.index)

module.exports = routes
