
import { combineReducers } from 'redux'

import auth from 'reducers/auth'
import citiesIndex from 'reducers/citiesIndex'
import selectedCity from 'reducers/selectedCity'
import experiences from 'reducers/experiences'


const serviceApp = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  experiences,
})

export default serviceApp
