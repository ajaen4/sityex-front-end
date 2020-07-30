
import { createStore, applyMiddleware, compose } from 'redux'
import serviceApp from 'reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const initStore = () => {

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

  let middlewares = []

  if(process.env.NODE_ENV !== 'production')
    middlewares.push(logger)

  middlewares.push(thunk)

  const store = createStore(
    serviceApp,
    composeEnhancers(applyMiddleware(...middlewares))
    )

  return store
}

export default initStore
