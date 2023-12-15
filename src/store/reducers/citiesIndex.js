import { createSlice } from "@reduxjs/toolkit";

const citiesIndexSlice = createSlice({
  name: "citiesIndex",
  initialState: {
    data: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    requestingCitiesIndex: (state) => {
      state.isFetching = true;
    },
    fetchCitiesIndexSuccess: (state, action) => {
      state.data = action.payload.citiesIndex;
      state.isFetching = false;
    },
  },
});

export const {
  requestingCitiesIndex,
  fetchCitiesIndexSuccess,
  fetchCitiesIndexFailure,
} = citiesIndexSlice.actions;
export default citiesIndexSlice.reducer;
