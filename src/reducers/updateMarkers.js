import { combineReducers } from 'redux'

import {
  UPDATE_MARKERS_SUCCESS,
  REQUESTING_UPDATE_MARKERS } from 'types'

const initUpdateMarkers = () => {

  const message = (state = "", action) => {
    switch(action.type){
      case UPDATE_MARKERS_SUCCESS:
        return {...state, message: action.message}
      default: return state
    }
  }

  const isFetching = (state = false, action) => {
    switch(action.type){
      case REQUESTING_UPDATE_MARKERS:
        return true
      case UPDATE_MARKERS_SUCCESS:
        return false
      default: return state
    }
  }

  return combineReducers({
    message,
    isFetching})
}

const updateMarkers = initUpdateMarkers()

export default updateMarkers
