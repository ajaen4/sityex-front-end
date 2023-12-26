import {
  setAuthUser,
  setIsAuthResolved,
  userJustCreated,
  justLoggedIn,
  setAuthUserError,
} from "store/reducers/auth";

import * as api from "api";

export const createUser = (signUpData) => (dispatch, getState) => {
  return api
    .createUser(signUpData)
    .then((user) => dispatch(userJustCreated(true)));
};

export const logInUser = (logInData) => (dispatch, getState) => {
  return api.logIn(logInData).then((user) => dispatch(justLoggedIn(true)));
};

export const logInUserWithGoogle = () => (dispatch, getState) => {
  return api.logInWithGoogle().then((user) => dispatch(justLoggedIn(true)));
};

export const signOutUser = (uid) => {
  api.signOutUser();
};

export const onAuthStateChanged = (onAuthCallback) =>
  api.onAuthStateChangedCallback(onAuthCallback);

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if (authUser && authUser.emailVerified) {
    api.getUserData(authUser.uid).then(
      (user) => dispatch(setAuthUser({ user: user, isAuthResolved: true })),
      (errorMessage) =>
        dispatch(setAuthUserError({ errorMessage: errorMessage }))
    );
  } else {
    dispatch(setIsAuthResolved({ isAuthResolved: false }));
  }
};

export const updateUser = (userData) => {
  return api.updateUser(userData);
};
