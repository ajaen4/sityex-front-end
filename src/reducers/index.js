
import { combineReducers } from 'redux'

//----------- AUTH
import authUser from 'reducers/authUser.js'

//----------- CITIES
import citiesIndex from 'reducers/citiesIndex.js'
import selectedCity from 'reducers/selectedCity.js'

const serviceApp = combineReducers({
  authUser,
  citiesIndex,
  selectedCity
})

export default serviceApp
