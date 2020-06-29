import socketIo from 'socket.io'
import { Server } from 'http'
import downloadMusic from './services/downloadMusic'

interface DownloadData {
  album:string;
  artist:string;
  title:string;
  cover:string;
  number:number;
  year:number
  url:string;
  lyrics:string | null;
  translation:string | null;
}

export default function setupWebSocketServer (server:Server):void {
  const io = socketIo(server)
  io.on('connection', socket => {
    socket.on('downloadMusic', (data:DownloadData) => {
      downloadMusic(data, socket.id, ({ type, ...data }) => {
        socket.emit(type, data)
      })
    })
  })
}
