import { combineReducers } from 'redux'

import {
  REQUESTING_CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR } from 'types'

const initCreateUser = () => {

  const data = (state = {}, action) => {
    switch(action.type){
      case CREATE_USER_SUCCESS:
        return action.user
      default: return state
    }
  }

  const justLoggedIn = (state = false, action) => {
    switch(action.type){
      case JUST_LOGGED_IN:
        return action.justLoggedIn
      default: return state
    }
  }

  const isFetching = (state = false, action) => {
    switch(action.type){
      case REQUESTING_CREATE_USER:
        return true
      case CREATE_USER_SUCCESS:
        return false
      case CREATE_USER_ERROR:
        return false
      default: return state
    }
  }

  const errorMessage = (state = "", action) => {
    switch(action.type){
      case CREATE_USER_ERROR:
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

const createUser = initCreateUser()

export default createUser
