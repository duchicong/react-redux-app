import {
  REGISTER_ACCOUNT,
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from './actionTypes'
import cookie from 'js-cookie'

export function regiser(data) {
  return {
    type: REGISTER_ACCOUNT,
    payload: data
  }
}

export function loginStart() {
  return {
    type: AUTH_START
  }
}

export function loginFailed(data) {
  return {
    type: AUTH_FAILED,
    payload: data
  }
}

export function loginSuccess(data) {
  cookie.set('token', data.idToken)
  cookie.set('localId', data.localId)
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export function authLogout() {
  cookie.remove('token')
  cookie.remove('localId')
  return {
    type: AUTH_LOGOUT
  }
}
