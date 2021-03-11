import statusReducer from './status'
import Setting from './setting'
import FoodsReducer from './foods'
import CardsReducer from './cards'
import UsersReducer from './users'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
  status: statusReducer,
  setting: Setting,
  cards: CardsReducer,
  foods: FoodsReducer,
  users: UsersReducer
})

export default allReducers