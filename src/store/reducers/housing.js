import { createSlice } from "@reduxjs/toolkit";

const HousingIndexSlice = createSlice({
  name: "housingIndex",
  initialState: {
    data: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    requestingHousingIndex: (state) => {
      state.isFetching = true;
    },
    fetchHousingIndexSuccess: (state, action) => {
      state.data = action.payload.housingIndex;
      state.isFetching = false;
    },
  },
});

export const { requestingHousingIndex, fetchHousingIndexSuccess } =
  HousingIndexSlice.actions;
export default HousingIndexSlice.reducer;
