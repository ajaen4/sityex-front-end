import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    justLoggedIn: false,
    userJustCreated: false,
    isAuthResolved: false,
    errorMessage: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.data = action.payload.user;
      state.isAuthResolved = !!action.payload.isAuthResolved;
    },
    setIsAuthResolved: (state, action) => {
      state.isAuthResolved = action.payload.isAuthResolved;
    },
    userJustCreated: (state, action) => {
      state.userJustCreated = action.payload.userJustCreated;
    },
    justLoggedIn: (state, action) => {
      state.justLoggedIn = action.payload.justLoggedIn;
    },
    setAuthUserError: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  setAuthUser,
  setIsAuthResolved,
  userJustCreated,
  justLoggedIn,
  setAuthUserError,
} = authSlice.actions;
export default authSlice.reducer;
