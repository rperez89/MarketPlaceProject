import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import adminReducer from './admin/adminReducer'
import storeOwnerReducer from './storeowner/storeOwnerReducer'
import web3Reducer from './util/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  admin: adminReducer,
  storeowner: storeOwnerReducer,
  web3: web3Reducer
})

export default reducer
