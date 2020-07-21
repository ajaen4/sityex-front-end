import { combineReducers } from 'redux'

import {
  FETCH_CITY_SUCCESS,
  REQUESTING_CITY } from 'types'

const initSelectedCity = () => {

  const data = (state = {}, action) => {
    switch(action.type){
      case FETCH_CITY_SUCCESS:
        return action.cityData
      default: return state
    }
  }


const isFetching = (state = false, action) => {
  switch(action.type){
    case REQUESTING_CITY:
      return true
    case FETCH_CITY_SUCCESS:
      return false
    default: return state
  }
}

return combineReducers({
  data,
  isFetching})
}

const selectedCity = initSelectedCity()

export default selectedCity
