import {
  ADD_CARD,
  REMOVE_CARD_ITEM
} from '../actions/actionTypes'

const initialState = {
  cards: [],
  loading: false,
  message: null
}

export default function cardsReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_CARD:
      let cardItem = state.cards.find((item, index) => {
        if (item.id === payload.id) {
          state.cards.splice(index, 1)
          return item
        }
        return false
      })
      if (cardItem) {
        cardItem = { ...cardItem, count: cardItem?.count + 1 }
      } else cardItem = { ...payload, count: 1 }

      return {
        ...state,
        cards: [ ...state.cards, cardItem ]
      }
    case REMOVE_CARD_ITEM:
      state.cards = state.cards.filter(item => item.id !== payload)
      return {
        ...state
      }
    default:
      return initialState;
  }
}