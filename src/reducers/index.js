
import { combineReducers } from 'redux'

//----------- AUTH
import setAuthUser from 'reducers/setAuthUser.js'

//----------- CITIES
import citiesIndex from 'reducers/citiesIndex.js'
import selectedCity from 'reducers/selectedCity.js'

const serviceApp = combineReducers({
  setAuthUser,
  citiesIndex,
  selectedCity
})

export default serviceApp
