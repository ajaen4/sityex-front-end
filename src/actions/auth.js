
import {
  SET_AUTH_USER,
  JUST_LOGGED_IN,
  USER_JUST_CREATED,
  SET_AUTH_USER_ERROR } from 'types'

import *  as api from 'api'

export const createUser = (signUpData) => (dispatch, getState) => {
  return api
  .createUser(signUpData)
  .then(user => dispatch({ type: USER_JUST_CREATED, userJustCreated: true }))
}

export const userJustCreatedShown = () => (dispatch, getState) => {
  dispatch({ type: USER_JUST_CREATED, userJustCreated: false })
}

export const logInUser = logInData => (dispatch, getState) => {
  return api
  .logIn(logInData)
  .then(user => dispatch({ type: JUST_LOGGED_IN, justLoggedIn: true }))
}

export const justLoggedInShown = () => (dispatch, getState) => {
  dispatch({ type: JUST_LOGGED_IN, justLoggedIn: false })
}

export const signOutUser = uid => {
  api
  .signOut()
  .then(() => {
    const userStatusDatabaseRef = api.createFirebaseRef("status", uid)
    return userStatusDatabaseRef.set(api.isOfflineForDatabase)
  })
}

export const onAuthStateChanged = (onAuthCallback) => api.onAuthStateChanged(onAuthCallback)

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if(authUser){
    api
    .getUserData(authUser.uid)
    .then(user => dispatch({ type: SET_AUTH_USER, user: user, isAuthResolved: true })
    , (errorMessage) => dispatch({ type: SET_AUTH_USER_ERROR, errorMessage: errorMessage }))
  }
  else dispatch({ type: SET_AUTH_USER, user: null, isAuthResolved: false })
}
