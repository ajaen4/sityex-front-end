
import { createStore, combineReducers } from 'redux'


const initStore = () => {

  const serviceApp = combineReducers({
    service: () => ({ testingData: 'Hello World', testingNumber: 10})
  })

  const browerSupport = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(serviceApp, browerSupport)

  return store
}

export default initStore
