const express  = require("express")
const cors = require('cors')
const http = require("http")
const socket  = require("socket.io")

const server = {
 app:express()
}
server.httpServer = http.Server(server.app)
server.io = socket(server.httpServer)

const whitelist = [
'http://localhost:3000',
'http://localhost:5000',
'https://ytmdown.web.app',
'https://ytmdown.firebaseapp.com',
'https://ytmdown.herokuapp.com',
 undefined
]
const corsOptions = {
 origin: (origin, callback)=>{
	if (whitelist.indexOf(origin) !== -1) {
	 callback(null, true)
	} else {
	 callback(new Error('Not allowed by CORS'))
	}
 }
}
server.io.origins(corsOptions.origin)
server.app.use(cors(corsOptions))

server.app.disable('etag')
server.app.disable('x-powered-by')

module.exports = server
