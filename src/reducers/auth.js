import {
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/actionTypes'
import cookie from 'js-cookie'

let initialState = {
  token: null,
  localId: null,
  error: null,
  loading: false,
  isAuth: false
}

if (cookie.get('token') && cookie.get('localId')) {
  initialState = {
    ...initialState,
    token: cookie.get('token'),
    localId: cookie.get('localId'),
    isAuth: true
  }
}

setTimeout(() => {
  cookie.remove('token')
  cookie.remove('localId')
  initialState = {
    token: null,
    localId: null,
    error: null,
    loading: false,
    isAuth: false
  }
}, 1000*60*24*60);

function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        token: payload.idToken,
        localId: payload.localId,
        error: null,
        loading: false
      }
    case AUTH_FAILED:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case AUTH_LOGOUT:
      window.location.reload()
      return state
    default:
      return initialState
  }
}

export default authReducer