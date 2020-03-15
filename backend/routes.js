const {Router} = require("express")

const AlbumController = require("./controllers/album")
const IframeController = require("./controllers/iframe")
const MusicController = require("./controllers/music")
const LyricsController = require("./controllers/lyrics")
const VersionController = require("./controllers/version")
const NextController = require("./controllers/next")
const {getMusicFile}= require("./musicDownloader")

const routes = Router()

routes.get("/",(request,response)=>{
 response.status(301).set('Location','https://ytmdown.web.app').send()
})
routes.get("/music/:id.mp3",
 (request,response)=>{
	const {id} = request.params
	const stream = getMusicFile(id)
	response.download(stream.path)
 }
)

routes.get("/album",AlbumController.index)
routes.get("/iframe",IframeController.index)
routes.get("/music",MusicController.index)
routes.get("/lyrics",LyricsController.index)
routes.get("/version",VersionController.index)
routes.get("/next",NextController.index)

module.exports = routes
