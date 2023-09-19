
import { combineReducers } from 'redux'

import auth from 'reducers/auth'
import citiesIndex from 'reducers/citiesIndex'
import selectedCity from 'reducers/selectedCity'
import reviews from 'reducers/reviews'


const serviceApp = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  reviews,
})

export default serviceApp
