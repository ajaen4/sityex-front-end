import { combineReducers } from 'redux'

import { FETCH_CITIES_INDEX_SUCCESS, REQUESTING_CITIES_INDEX } from 'types'

const INITIAL_STATE = null

const initCitiesIndex = () => {

  const data = (state = INITIAL_STATE, action) => {
    switch(action.type){
      case FETCH_CITIES_INDEX_SUCCESS:
        return action.citiesIndex
      default: return state
    }
  }

  const isFetching = (state = false, action) => {
    switch(action.type){
      case REQUESTING_CITIES_INDEX:
        return true
      case FETCH_CITIES_INDEX_SUCCESS:
        return false
      default: return state
    }
  }

  return combineReducers({
    data,
    isFetching
  })

}

const citiesIndex = initCitiesIndex()

export default citiesIndex
