import { createSlice } from "@reduxjs/toolkit";

const selectedCountrySlice = createSlice({
  name: "selectedCountry",
  initialState: {
    data: null,
    isFetching: false,
  },
  reducers: {
    requestingCountry: (state) => {
      state.isFetching = true;
    },
    fetchCountrySuccess: (state, action) => {
      state.data = action.payload.countryData;
      state.isFetching = false;
    },
  },
});

export const { requestingCountry, fetchCountrySuccess } =
  selectedCountrySlice.actions;

export default selectedCountrySlice.reducer;
