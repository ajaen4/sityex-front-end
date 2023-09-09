import React, { Component } from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  BrowserRouter as Router
} from 'react-router-dom'
import initStore from 'store'
import { Provider } from 'react-redux'

import {LoadScript} from '@react-google-maps/api'

import SityExApp from './SityExApp'

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
      auth: null,
      componentMounted: false
    }
  }

  componentDidMount() {
    this.setState({componentMounted: true})
    this.unsuscribeMessages = () => {}
    this.unsuscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser))

      if (authUser){
          checkUserConnection(authUser.uid)
          this.unsuscribeMessages = store.dispatch(subscribeToMessages(authUser.uid))
          this.setState({auth: authUser})
        }
    })

  }

  componentWillUnmount() {
    this.unsuscribeAuth()
    this.unsuscribeMessages()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.auth && store.getState().citiesIndex.data === null) {
      store.dispatch(fetchCitiesIndex())
    }

    if (!this.state.auth)
      this.unsuscribeMessages()
  }

  render(){
    return (
      <Provider store = {store}>
        <LoadScript googleMapsApiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries = {LIBRARIES} language = "en">
          <Router>
            <SityExApp/>
          </Router>
        </LoadScript>
      </Provider>
    )
  }
}

export default App
