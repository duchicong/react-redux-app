import { ADD_FOOD, GET_FOOD, REMOVE_FOOD } from './actionTypes'

const fetchFood = (foods) => {
  return {
    type: GET_FOOD,
    payload: [...foods]
  }
}

const addFood = (food) => {
  return {
    type: ADD_FOOD,
    payload: food
  }
}

const deleteFood = (id) => {
  return {
    type: REMOVE_FOOD,
    payload: id
  }
}

export {
  addFood,
  deleteFood,
  fetchFood
}