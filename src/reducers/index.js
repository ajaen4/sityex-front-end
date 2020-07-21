
import { combineReducers } from 'redux'

//----------- AUTH
import createUser from 'reducers/createUser.js'
import logInUser from 'reducers/logInUser.js'

//----------- CITIES
import citiesIndex from 'reducers/citiesIndex.js'
import selectedCity from 'reducers/selectedCity.js'
import updateMarkers from 'reducers/updateMarkers.js'


const serviceApp = combineReducers({
  createUser,
  logInUser,
  citiesIndex,
  selectedCity,
  updateMarkers
})

export default serviceApp
