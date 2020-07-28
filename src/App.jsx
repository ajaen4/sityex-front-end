import React, { Component } from 'react'

import {
  BrowserRouter as Router
} from 'react-router-dom'
import initStore from 'store'
import { Provider } from 'react-redux'

//Custom fuctionality
import ErasmusApp from './ErasmusApp'
import { onAuthStateChanged, storeAuthUser } from 'actions'

const store = initStore()

class App extends Component {

  constructor (props){
    super(props)

    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    this.unsuscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser))
    })
  }

  componentWillUnmount() {
    this.unsuscribeAuth()
  }

  render(){
    return (
      <Provider store = {store}>
          <Router>
            <ErasmusApp/>
          </Router>
      </Provider>
    )
  }
}

export default App
