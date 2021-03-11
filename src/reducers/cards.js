import {
  ADD_CARD,
  REMOVE_CARD_ITEM
} from '../actions/actionTypes'

export default function cardsReducer (state = [], { type, payload }) {
  switch (type) {
    case ADD_CARD:
      return state.push(payload)
    case REMOVE_CARD_ITEM:
      return state.filter(item => item.id === payload)
    default:
      return state;
  }
}