import axios from 'axios'

const backendUrl =
  process.env.NODE_ENV === 'development'
    ? (process.env.REACT_APP_BACKEND_URL || 'https://staging-ytmdown.herokuapp.com')
    : 'https://ytmdown.herokuapp.com'

export default axios.create({
  baseURL: backendUrl
})
