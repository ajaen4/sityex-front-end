
import {
  SET_AUTH_USER,
  JUST_LOGGED_IN,
  SET_AUTH_USER_ERROR } from 'types'

import *  as api from 'api'

export const createUser = (signUpData) => api.createUser(signUpData)

export const logInUser = (logInData) => (dispatch, getState) => {
  debugger
  return api.logIn(logInData)
  .then(user => dispatch({ type: JUST_LOGGED_IN, justLoggedIn: true }))
}

export const justLoggedInShown = () => (dispatch, getState) => {
  debugger
  dispatch({ type: JUST_LOGGED_IN, justLoggedIn: false })
}

export const signOutUser = () => api.signOut()

export const onAuthStateChanged = (onAuthCallback) => api.onAuthStateChanged(onAuthCallback)

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if(authUser){
    api.getUserData(authUser.uid)
    .then(user => dispatch({ type: SET_AUTH_USER, user: user, isAuthResolved: true })
    , (errorMessage) => dispatch({ type: SET_AUTH_USER_ERROR, errorMessage: errorMessage }))
  }
  else dispatch({ type: SET_AUTH_USER, user: null, isAuthResolved: false })
}
