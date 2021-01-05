
import { combineReducers } from 'redux'

import authUser from 'reducers/authUser.js'
import citiesIndex from 'reducers/citiesIndex.js'
import selectedCity from 'reducers/selectedCity.js'
import experiences from 'reducers/experiences.js'
import housemates from 'reducers/housemates.js'

const serviceApp = combineReducers({
  authUser,
  citiesIndex,
  selectedCity,
  experiences,
  housemates
})

export default serviceApp
