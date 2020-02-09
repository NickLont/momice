import { all, fork } from 'redux-saga/effects'
import { userSagaWatcher } from './user'

// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([
    fork(userSagaWatcher)
  ])
}
