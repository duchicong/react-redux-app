import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFood } from '../actions'

const FoodList = () => {
  const { foods } = useSelector(state => state)
  const dispatch = useDispatch()
  const foodsRender = foods.map(food => (
    <li
      key={food.id}
      onClick={() => dispatch(selectFood(food))}
    >Food's name: <strong>{food.name}</strong></li>
  ))
  return (
    <ul>
      {foodsRender}
    </ul>
  )
}

export default FoodList