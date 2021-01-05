import React, { Component } from 'react'

import {
  BrowserRouter as Router
} from 'react-router-dom'
import initStore from 'store'
import { Provider } from 'react-redux'

import {LoadScript} from '@react-google-maps/api'

import 'react-dates/initialize'

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

const LIBRARIES = ["places"]

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
        <LoadScript googleMapsApiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries = {LIBRARIES} language = "en">
          <Router>
            <ErasmusApp/>
          </Router>
        </LoadScript>
      </Provider>
    )
  }
}

export default App
