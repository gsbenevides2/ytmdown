import './config'
import Sentry from './sentry'
import express from 'express'
import http from 'http'
import { errors } from 'celebrate'
import cors from 'cors'
import routes from './routes'
import setupWebSocket from './webSocket'

const app = express()
app.use(Sentry.Handlers.requestHandler())
app.use(cors())
app.use(routes)
app.use(errors())
const server = http.createServer(app)

const port = process.env.PORT || 3333
setupWebSocket(server)
server.listen(port, () => {
  console.log('Servidor rodando na porta:', port)
})
