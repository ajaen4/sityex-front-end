
import React from "react"
import ReactDOM from "react-dom"

// styles for this kit
import "assets/css/bootstrap.min.css"
import "assets/scss/now-ui-kit.scss"
import "assets/demo/demo.css"
import "assets/demo/nucleo-icons-page-styles.css"

//Cache data in order to work offline
import * as serviceWorker from './serviceWorker'

import App from 'components/App.jsx'

import Unirest, { UnirestContext } from 'apis/Unirest'
import initStore from 'store'
import { Provider } from 'react-redux'

const store = initStore()

ReactDOM.render(
  <Provider store = {store}>
      <UnirestContext.Provider value = {new Unirest()}>
        <App />
      </UnirestContext.Provider>
  </Provider>,
  document.getElementById('root'),
)

/*if (module.hot) {
module.hot.accept()
}*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
