
import {
  SET_AUTH_USER,
  SET_AUTH_USER_ERROR } from 'types'

import *  as api from 'api'

export const createUser = (signUpData) => api.createUser(signUpData)

export const logInUser = (logInData) => api.logIn(logInData)

export const signOutUser = () => api.signOut()

export const onAuthStateChanged = (onAuthCallback) => api.onAuthStateChanged(onAuthCallback)

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if(authUser){
    api.getUserData(authUser.uid)
    .then(user => dispatch({ type: SET_AUTH_USER, user: user })
    , (errorMessage) => dispatch({ type: SET_AUTH_USER_ERROR, errorMessage: errorMessage }))
  }
  else dispatch({ type: SET_AUTH_USER, user: null })
}
