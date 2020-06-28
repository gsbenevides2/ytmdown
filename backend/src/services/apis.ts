import request from 'request'

export const deezer = request.defaults({
  baseUrl: 'https://api.deezer.com',
  json: true
})
export const vagalume = request.defaults({
  baseUrl: 'https://api.vagalume.com.br',
  json: true,
  qs: {
    api_key: process.env.VAGALUME_API_KEY
  }
})
