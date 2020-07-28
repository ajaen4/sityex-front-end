import { combineReducers } from 'redux'

import {
  SET_AUTH_USER,
  SET_AUTH_USER_ERROR } from 'types'

const initLogInUser = () => {

  const data = (state = {}, action) => {
    switch(action.type){
      case SET_AUTH_USER:
        return action.user
      default: return state
    }
  }

  const errorMessage = (state = "", action) => {
    switch(action.type){
      case SET_AUTH_USER_ERROR:
        return action.errorMessage
      default: return state
    }
  }

  return combineReducers({
    data,
    errorMessage
  })

}

const logInUser = initLogInUser()

export default logInUser
