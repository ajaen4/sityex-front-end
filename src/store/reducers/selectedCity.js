import { createSlice } from "@reduxjs/toolkit";

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState: {
    data: null,
    isFetching: false,
  },
  reducers: {
    requestingCity: (state) => {
      state.isFetching = true;
    },
    fetchCitySuccess: (state, action) => {
      state.data = action.payload.cityData;
      state.isFetching = false;
    },
  },
});

export const { requestingCity, fetchCitySuccess } = selectedCitySlice.actions;

export default selectedCitySlice.reducer;
