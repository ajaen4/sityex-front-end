import {
  setAuthUser,
  setIsAuthResolved,
  setAuthUserError,
} from "store/reducers/auth";

import * as api from "api";

export const createUser = (signUpData) => {
  return api.createUser(signUpData);
};

export const logInUser = (logInData) => {
  return api.logIn(logInData);
};

export const logInUserWithGoogle = () => {
  return api.logInWithGoogle();
};

export const signOutUser = (uid) => {
  api.signOutUser();
};

export const onAuthStateChanged = (onAuthCallback) =>
  api.onAuthStateChangedCallback(onAuthCallback);

export const storeAuthUser = (authUser) => (dispatch, getState) => {
  if (authUser && authUser.emailVerified) {
    api.getUserData(authUser.uid).then(
      (user) => {
        if (user) {
          dispatch(setAuthUser({ user: user, isAuthResolved: true }));
        } else {
          const tempUserData = {
            id: authUser.uid,
            email: authUser.email,
            userName: authUser.displayName,
          };
          dispatch(setAuthUser({ user: tempUserData, isAuthResolved: true }));
        }
      },
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
