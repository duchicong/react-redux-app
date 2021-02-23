import { SELECT_FOOD } from './actionTypes'
// action creater
export const selectFood = (food) => {
  console.log('you clicked a food with name = ' + food.name);
  return {
    type: SELECT_FOOD,
    payload: food
  }
}