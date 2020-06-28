import {Request,Response} from 'express'
import getMusic from '../services/getMusic'

class MusicController{
 index(request:Request,response:Response){
	const {id} = request.query
	getMusic(Number(id))
	 .then(data=>{
		response.json(data)
	 })
 }
}

export default new MusicController()
