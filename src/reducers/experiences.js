import { combineReducers } from 'redux'

import {
  SAVING_EXPERIENCE,
  SAVING_EXPERIENCE_SUCCESS } from 'types'

const initExperiences = () => {

  const isFetching = (state = false, action) => {
    switch(action.type){
      case SAVING_EXPERIENCE:
        return true
      case SAVING_EXPERIENCE_SUCCESS:
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