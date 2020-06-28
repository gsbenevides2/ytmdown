import {celebrate, Joi} from 'celebrate'

export const video = celebrate({
 query:{
	url:Joi.string().required()
 }
},{
 abortEarly:false,
 allowUnknown:true
})

export const music = celebrate({
 query:{
	id:Joi.number().required()
 }
})
export const musics = celebrate({
 query:{
	searchTerm:Joi.string().required(),
	index:Joi.number()
 }
})

export const lyrics = celebrate({
 query:{
	musicName:Joi.string().required(),
	artist:Joi.string().required()
 }
})
