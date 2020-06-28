import axios from 'axios'

const backendUrl = process.env.REACT_APP_BACKEND_URL as string

export default axios.create({
  baseURL: backendUrl
})
