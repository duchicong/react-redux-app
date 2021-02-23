import FoodsReducer from './foods'
import UsersReducer from './users'
import ActiveFoodReducer from './active-food-reducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
  foods: FoodsReducer,
  users: UsersReducer,
  activeFood: ActiveFoodReducer
})

export default allReducers