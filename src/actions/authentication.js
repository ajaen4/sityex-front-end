
import {
  REQUESTING_CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  REQUESTING_LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR } from 'types'

import { db } from 'db'

export const createUser = (signUpData) => (dispatch, getState) => {
  dispatch({type: REQUESTING_CREATE_USER})
  return db.doCreateUser(signUpData)
        .then(user => {
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
  debugger
  dispatch({type: REQUESTING_LOG_IN})
  return db.doSignInWithEmailAndPassword(logInData)
        .then(user => {
          debugger
          dispatch({
            type: LOG_IN_SUCCESS,
            user: user
          })
        }, (errorMessage) => {
          debugger
          dispatch({
            type: LOG_IN_ERROR,
            errorMessage: errorMessage
          })
        })
}
