import { createSlice } from "@reduxjs/toolkit";

const allCountriesSlice = createSlice({
  name: "allCountries",
  initialState: {
    data: null,
    isFetching: false,
  },
  reducers: {
    requestingAllCountries: (state) => {
      state.isFetching = false;
    },
    fetchAllCountriesSuccess: (state, action) => {
      state.data = action.payload.allCountriesData;
      state.isFetching = true;
    },
  },
});

export const { requestingAllCountries, fetchAllCountriesSuccess } =
  allCountriesSlice.actions;

export default allCountriesSlice.reducer;
