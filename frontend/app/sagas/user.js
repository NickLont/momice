import { call, put, takeLatest } from "redux-saga/effects"
import { UserActions } from 'actions'
import * as Api from 'utils/api'
import { fromJS } from 'immutable'
// import history from 'historyConfig'

function* fetchUser(user) {
  try {
    yield put(UserActions.fetchUserRequest())
    // (user) is the object returned from fetchUser action creator, so it is { type: 'FETCH_USER', data: user }
    const data = yield call(Api.User.fetchUser, user.data)
    yield put(UserActions.fetchUserSuccess(fromJS(data))) // Turning data abject to Immutable Map, example purposes
  } catch (error) {
    yield put(UserActions.fetchUserFailure(error.message || error))
  }
}
function* logoutUser () {
  yield console.log('user logged out')

  // This is how we can navigate outside Components using the history object
  // yield call(history.push, '/somePage')
}

export function* userSagaWatcher() {
  yield takeLatest("FETCH_USER", fetchUser)
  yield takeLatest("LOGOUT_USER", logoutUser)
}
