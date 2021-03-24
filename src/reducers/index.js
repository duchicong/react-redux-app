import authReducer from './auth'
import statusReducer from './status'
import Setting from './setting'
import FoodsReducer from './foods'
import CardsReducer from './cards'
import UsersReducer from './users'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
  auth: authReducer,
  status: statusReducer,
  setting: Setting,
  cardStore: CardsReducer,
  foods: FoodsReducer,
  users: UsersReducer
})

export default allReducers