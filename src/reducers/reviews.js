import { combineReducers } from 'redux'

import {
  SAVING_review,
  SAVING_review_SUCCESS } from 'types'

const initreviews = () => {

  const isFetching = (state = false, action) => {
    switch(action.type){
      case SAVING_review:
        return true
      case SAVING_review_SUCCESS:
        return false
      default: return state
    }
  }

  return combineReducers({
    isFetching
  })
}

const reviews = initreviews()

export default reviews
