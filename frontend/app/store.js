import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from 'sagas'
import rootReducer   from 'reducers/rootReducer'

// Store

// redux dev tools enable
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  // create store takes 2 params. To setup store with both middleware and enhancers
  // we need to use redux compose
  const store = createStore(
    rootReducer, // preloaded store state of combined reducers
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
