import React, { Component } from 'react'

import {
  BrowserRouter as Router
} from 'react-router-dom'
import initStore from 'store'
import { Provider } from 'react-redux'

import {LoadScript} from '@react-google-maps/api'

import 'react-dates/initialize'

import ErasmusApp from './ErasmusApp'

import {
  onAuthStateChanged,
  storeAuthUser,
  fetchCitiesIndex,
  checkUserConnection,
  subscribeToMessages} from 'actions'

import {saveState} from "localStorage/localStorage"

const store = initStore()

//Persist user info, no refresh
store.subscribe(() => {
  const stateToSave = {}
  stateToSave.auth = store.getState().auth
  saveState(stateToSave)
})

const LIBRARIES = ["places"]

class App extends Component {

  constructor (props){
    super(props)

    this.state = {
      authUser: null,
      componentMounted: false
    }
  }

  componentDidMount() {
    this.setState({componentMounted: true})
    this.unsuscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser))

      if (authUser){
          checkUserConnection(authUser.uid)
          this.unsuscribeMessages = store.dispatch(subscribeToMessages(authUser.uid))
        }
      else
        this.unsuscribeMessages()
    })

    if(store.getState().citiesIndex.data === null)
      store.dispatch(fetchCitiesIndex())

  }

  componentWillUnmount() {
    this.unsuscribeAuth()
    this.unsuscribeMessages()
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
