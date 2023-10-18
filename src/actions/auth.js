import { set } from "firebase/database";

import {
  SET_AUTH_USER,
  JUST_LOGGED_IN,
  USER_JUST_CREATED,
  SET_AUTH_USER_ERROR
} from "types";

import * as api from "api";

export const createUser = (signUpData) => (dispatch, getState) => {
  return api
    .createUser(signUpData)
    .then((user) =>
      dispatch({ type: USER_JUST_CREATED, userJustCreated: true })
    );
};

export const logInUser = (logInData) => (dispatch, getState) => {
  return api
    .logIn(logInData)
    .then((user) => dispatch({ type: JUST_LOGGED_IN, justLoggedIn: true }));
};

export const logInUserWithGoogle = () => (dispatch, getState) => {
  return api
    .logInWithGoogle()
    .then((user) => dispatch({ type: JUST_LOGGED_IN, justLoggedIn: true }));
};

export const signOutUser = (uid) => {
  api.signOutUser().then(() => {
    const userStatusDatabaseRef = api.createFirebaseRef("status", uid);
    return set(userStatusDatabaseRef, api.isOfflineForDatabase);
  });
};

export const onAuthStateChanged = (onAuthCallback) =>
  api.onAuthStateChangedCallback(onAuthCallback);

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if (authUser && authUser.emailVerified) {
    api.getUserData(authUser.uid).then(
      (user) =>
        dispatch({ type: SET_AUTH_USER, user: user, isAuthResolved: true }),
      (errorMessage) =>
        dispatch({ type: SET_AUTH_USER_ERROR, errorMessage: errorMessage })
    );
  } else {
    dispatch({ type: SET_AUTH_USER, user: null, isAuthResolved: false });
  }
};
