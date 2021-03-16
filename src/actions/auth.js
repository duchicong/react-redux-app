import {
  REGISTER_ACCOUNT,
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS
} from './actionTypes' 

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
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}
