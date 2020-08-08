import { combineReducers } from 'redux'

import {
  SET_AUTH_USER,
  USER_JUST_CREATED,
  JUST_LOGGED_IN,
  SET_AUTH_USER_ERROR } from 'types'

const initAuthUser = () => {

  const data = (state = null, action) => {
    switch(action.type){
      case SET_AUTH_USER:
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

  const userJustCreated = (state = false, action) => {
    switch(action.type){
      case USER_JUST_CREATED:
        return action.userJustCreated
      default: return state
    }
  }

  const isAuthResolved = (state = false, action) => {
    switch(action.type){
      case SET_AUTH_USER:
        return action.isAuthResolved
      default: return state
    }
  }

  const errorMessage = (state = null, action) => {
    switch(action.type){
      case SET_AUTH_USER_ERROR:
        return action.errorMessage
      default: return state
    }
  }

  return combineReducers({
    data,
    justLoggedIn,
    userJustCreated,
    isAuthResolved,
    errorMessage
  })

}

const authUser = initAuthUser()

export default authUser
