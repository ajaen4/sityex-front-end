
import { createStore, combineReducers } from 'redux'

import servicesReducer from 'reducers'

const initStore = () => {

  const serviceApp = combineReducers({
    service: servicesReducer
  })

  const browerSupport = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(serviceApp, browerSupport)

  return store
}

export default initStore
