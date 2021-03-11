import {
  GET_FOOD,
  ADD_FOOD,
  REMOVE_FOOD
} from '../actions/actionTypes'

function foodsReducer(state = [], action) {
  switch (action.type) {
    case GET_FOOD:
      return [...action.payload]
    case ADD_FOOD:
      return [
        ...state,
        action.payload
      ]
    case REMOVE_FOOD:
      state = state.filter(item => item.id !== action.payload)
      return state
    default:
      return state;
  }
}
export default foodsReducer