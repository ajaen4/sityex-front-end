import { combineReducers } from 'redux'

import {
  SAVING_EXPERIENCES,
  SAVING_EXPERIENCES_SUCCESS } from 'types'

const initExperiences = () => {

  const isFetching = (state = false, action) => {
    switch(action.type){
      case SAVING_EXPERIENCES:
        return true
      case SAVING_EXPERIENCES_SUCCESS:
        return false
      default: return state
    }
  }

  return combineReducers({
    isFetching
  })
}

const experiences = initExperiences()

export default experiences
