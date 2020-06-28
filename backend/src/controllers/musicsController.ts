import {Request, Response} from 'express'
import getMusicsFromSearchTerm from '../services/getMusicsFromSearchTerm'

interface QueryParams {
 searchTerm:string;
 index:number;
}

class MusicsController{
 index(request:Request,response:Response){
	const {searchTerm , index} = request.query
	getMusicsFromSearchTerm(searchTerm as string,Number(index))
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
}

export default new MusicsController()
