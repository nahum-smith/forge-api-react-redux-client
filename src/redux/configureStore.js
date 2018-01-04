import * as reducers from './modules/index'
import logger from 'redux-logger'
import { loadState, saveState } from '../localStorage/localStorage'
import throttle from 'lodash/throttle'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

const configureStore = (localLoad = false) => {
  const persistedState = localLoad ? loadState() : {}
  const combinedReducers = combineReducers(reducers)
  const store = createStore(combinedReducers, persistedState, compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))
  store.subscribe(throttle(() => {
    saveState({...store.getState()})
  }, 1000))

  return store
}

export default configureStore
