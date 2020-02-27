const {Router} = require("express")

const AlbumController = require("./controllers/album")
const MusicController = require("./controllers/music")
const LyricsController = require("./controllers/lyrics")
const {getMusicFile}= require("./musicDownloader")

const routes = Router()

routes.get("/",(request,response)=>{
 response.status(301).set('Location','https://ytmdown.web.app').send()
})
routes.get("/music/:id.mp3",
 (request,response)=>{
	const {id} = request.params
	const stream = getMusicFile(id)
	response.sendFile(stream.path)
 }
)

routes.get("/album",AlbumController.index)
routes.get("/music",MusicController.index)
routes.get("/lyrics",LyricsController.index)

module.exports = routes
