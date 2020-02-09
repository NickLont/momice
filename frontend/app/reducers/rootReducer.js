import { combineReducers } from 'redux-immutable'
import UserReducer from './user'

// combine all reducers here and optionally give key for store
// combineReducers of redux-immutable is used to create an equivalent function of Redux combineReducers that works with Immutable.js state
export default combineReducers({
  user: UserReducer
})
