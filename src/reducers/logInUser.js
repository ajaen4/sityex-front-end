import { combineReducers } from 'redux'

import {
  REQUESTING_LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR } from 'types'

const initLogInUser = () => {

  const data = (state = {}, action) => {
    switch(action.type){
      case LOG_IN_SUCCESS:
        return action.user
      default: return state
    }
  }

  const isFetching = (state = false, action) => {
    switch(action.type){
      case REQUESTING_LOG_IN:
        return true
      case LOG_IN_SUCCESS:
        return false
      case LOG_IN_ERROR:
        return false
      default: return state
    }
  }

  const errorMessage = (state = "", action) => {
    switch(action.type){
      case LOG_IN_ERROR:
        return action.errorMessage
      default: return state
    }
  }

  return combineReducers({
    data,
    isFetching,
    errorMessage
  })

}

const logInUser = initLogInUser()

export default logInUser
