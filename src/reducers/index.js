
import { combineReducers } from 'redux'

import auth from 'reducers/auth.js'
import citiesIndex from 'reducers/citiesIndex.js'
import selectedCity from 'reducers/selectedCity.js'
import experiences from 'reducers/experiences.js'
import housemates from 'reducers/housemates.js'

const serviceApp = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  experiences,
  housemates
})

export default serviceApp
