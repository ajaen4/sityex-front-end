import React, { Component } from 'react'

import {
  BrowserRouter as Router
} from 'react-router-dom'
import initStore from 'store'
import { Provider } from 'react-redux'

//Custom fuctionality
import ErasmusApp from './ErasmusApp'
import { onAuthStateChanged, storeAuthUser, fetchCitiesIndex } from 'actions'
import {saveState} from "localStorage/localStorage"


const store = initStore()

store.subscribe(() => {
  const stateToSave = {}
  stateToSave.authUser = store.getState().authUser
  saveState(stateToSave)
})

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
    if(store.getState().citiesIndex.data === null)
      store.dispatch(fetchCitiesIndex())
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
