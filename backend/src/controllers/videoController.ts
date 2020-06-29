import {Request, Response} from 'express'
import getMusicsFromVideo from '../services/getMusicsFromVideo'
import ytdl from 'ytdl-core'

class VideoController{
 index(request:Request,response:Response){
	const videoUrl = request.query.url as string
	if(ytdl.validateURL(videoUrl)){
	 getMusicsFromVideo(videoUrl)
		.then(data=>{
		 response.json(data)
		})
		.catch(err=>{
		 response.status(400).json({
			statusCode:400,
			error:"Bad Request",
			message:err
		 })
		})
	}
	else{
	 response.status(400).json({
		statusCode:400,
		error:"Bad Request",
		message:'"url" is incorrect'
	 })
	}
 }
}

export default new VideoController()
