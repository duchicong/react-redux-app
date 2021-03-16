import {
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS
} from '../actions/actionTypes' 

const initialState = {
  token: null,
  localId: null,
  error: null,
  loading: false
}

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
    default:
      return state
  }
}

export default authReducer