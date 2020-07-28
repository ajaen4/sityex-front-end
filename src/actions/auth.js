
import {
  REQUESTING_CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  REQUESTING_LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR } from 'types'

import *  as api from 'api'

export const createUser = (signUpData) => (dispatch, getState) => {
  dispatch({type: REQUESTING_CREATE_USER})
  return api.createUser(signUpData)
        .then(user => {
          debugger
          dispatch({
            type: CREATE_USER_SUCCESS,
            user: user
          })
        }, (errorMessage) => {
          dispatch({
            type: CREATE_USER_ERROR,
            errorMessage: errorMessage
          })
        })
}

export const logInUser = (logInData) => (dispatch, getState) => {
  dispatch({type: REQUESTING_LOG_IN})
  return api.logIn(logInData)
        .then(user => {
          dispatch({
            type: LOG_IN_SUCCESS,
            user: user
          })
        }, (errorMessage) => {
          dispatch({
            type: LOG_IN_ERROR,
            errorMessage: errorMessage
          })
        })
}

export const onAuthStateChanged = (onAuthCallback) => api.onAuthStateChanged(onAuthCallback)

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if(authUser){
    api.getUserData(authUser.uid)
    .then(user => {
      dispatch({
        type: LOG_IN_SUCCESS,
        user: user
      })
    }, (errorMessage) => {
      dispatch({
        type: LOG_IN_ERROR,
        errorMessage: errorMessage
      })
    })
  }
}
