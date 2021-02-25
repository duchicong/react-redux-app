import { SELECT_FOOD } from './actionTypes'

const selectFood = (food) => {
  console.log('you clicked a food with name = ' + food.name);
  return {
    type: SELECT_FOOD,
    payload: food
  }
}

export default selectFood