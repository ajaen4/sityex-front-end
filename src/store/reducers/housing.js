import { createSlice } from "@reduxjs/toolkit";

const HousingSlice = createSlice({
  name: "housing",
  initialState: {
    data: {
      city_id: null,
      pagesListings: [],
      lastVisibleDocId: null,
      orderBy: null,
    },
    filters: null,
    isFetching: false,
  },
  reducers: {
    resetHousingPage: (state, _) => {
      state.data.pagesListings = [];
      state.data.lastVisibleDocId = null;
      state.data.orderBy = null;
      state.isFetching = false;
    },
    fetchingHousingPage: (state) => {
      state.isFetching = true;
    },
    fetchHousingPageSuccess: (state, action) => {
      state.data.pagesListings = action.payload.pageListings;
      state.data.orderBy = action.payload.orderBy;
      state.isFetching = false;
    },
  },
});

export const {
  fetchHousingPageSuccess,
  resetHousingPage,
  fetchingHousingPage,
} = HousingSlice.actions;
export default HousingSlice.reducer;
