import { SELECT_FOOD } from '../actions/actionTypes'

const activeFoodReducer =  (state = {}, action) => {
  switch (action.type) {
    case SELECT_FOOD:
      return action.payload
    default:
      return null
  }
}

export default activeFoodReducer