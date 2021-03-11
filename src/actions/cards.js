import {
  ADD_CARD,
  REMOVE_CARD_ITEM
} from '../actions/actionTypes'

function addToCard (item) {
  return {
    type: ADD_CARD,
    payload: item
  }
}

function removeCardItem (id) {
  return {
    type: REMOVE_CARD_ITEM,
    payload: id
  }
}

export {
  addToCard,
  removeCardItem
}