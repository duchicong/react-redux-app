import React from 'react'
import { useSelector } from 'react-redux'

const FoodDetail = () => {
  const { activeFood } = useSelector(state => state)
  console.log('activeFood', activeFood)
  if (!activeFood) return null
  return (
    <div>
      <img src={activeFood?.imageUrl} alt={activeFood.name}/>
      <p>Name: {activeFood?.name}</p>
      <p>Description: {activeFood?.description}</p>
    </div>
  )
}

export default FoodDetail