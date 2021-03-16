import axios from 'axios'

export const register = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_REGISTER_API + process.env.REACT_APP_FIREBASE_KEY
})

export const login = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_LOGIN_API + process.env.REACT_APP_FIREBASE_KEY
})