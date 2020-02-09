import { Map } from 'immutable'

const initialState  = Map({
  loading: false,
  error: null,
  data: null
})

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST' :
      return state.set('loading', true)
    case 'FETCH_USER_SUCCESS' :
      return state.set('loading', false).set('data', action.data)
    case 'FETCH_USER_FAILURE' :
      return state.set('loading', false).set('error', action.error)
    default:
      return state
  }
}

export default UserReducer
