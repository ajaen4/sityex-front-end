import { createSlice } from "@reduxjs/toolkit";

import { filterListings } from "helpers/listUtils.js";

const HousingSlice = createSlice({
  name: "housing",
  initialState: {
    data: {
      city_id: null,
      housingListings: [],
      filteredHListings: [],
      lastVisibleDocId: null,
      orderBy: null,
      filters: null,
    },
    isFetching: false,
  },
  reducers: {
    resetHousingListings: (state, _) => {
      state.data.housingListings = [];
      state.data.lastVisibleDocId = null;
      state.data.orderBy = null;
      state.isFetching = false;
    },
    fetchingHousingListings: (state) => {
      state.isFetching = true;
    },
    fetchHousingListingsSuccess: (state, action) => {
      state.data.housingListings = action.payload.housingListings;
      state.data.filteredHListings = action.payload.housingListings;
      state.data.orderBy = action.payload.orderBy;
      state.isFetching = false;
    },
    setHousingOrderBy: (state, action) => {
      state.data.orderBy = action.payload.orderBy;
      state.data.filteredHListings = filterListings(
        state.data.housingListings,
        state.data.filters,
        state.data.orderBy
      );
      state.isFetching = false;
    },
    setHousingFilters: (state, action) => {
      state.data.filters = action.payload.filters;
      state.data.filteredHListings = filterListings(
        state.data.housingListings,
        state.data.filters,
        state.data.orderBy
      );
      state.isFetching = false;
    },
  },
});

export const {
  fetchHousingListingsSuccess,
  resetHousingListings,
  fetchingHousingListings,
  setHousingFilters,
  setHousingOrderBy,
} = HousingSlice.actions;
export default HousingSlice.reducer;
