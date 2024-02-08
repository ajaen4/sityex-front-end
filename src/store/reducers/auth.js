import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    isAuthResolved: null,
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
    setAuthUserError: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setAuthUser, setIsAuthResolved, setAuthUserError } =
  authSlice.actions;
export default authSlice.reducer;
