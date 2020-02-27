const server = require("./server")
const routes = require("./routes")
const webSocket = require("./webSocket")
 
const caramelPuppy = require("caramel-puppy")({
 __filename,
 express:server.app
})
caramelPuppy.appStart()

server.app.use(routes)

server.io.on("connection",webSocket)

server.httpServer.listen(process.env.PORT || 3000, ()=>{
 caramelPuppy.log("Ativado http")
 caramelPuppy.log("Porta usada",process.env.PORT || 3000)
})

