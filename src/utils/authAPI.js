import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_API + process.env.REACT_APP_FIREBASE_KEY
})

export default instance