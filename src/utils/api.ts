import axios from 'axios'
import constants from './constants'

const api = axios.create({
  baseURL: constants.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

export default api
