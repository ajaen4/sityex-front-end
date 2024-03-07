import { createSlice } from "@reduxjs/toolkit";

import { filterListings, orderByListings } from "helpers/listUtils.js";
import { defaultHousingFilters } from "constants/constants";

const HousingSlice = createSlice({
  name: "housing",
  initialState: {
    data: {
      housingListings: [],
      filteredHListings: [],
      orderBy: "",
      filters: defaultHousingFilters,
    },
    city_id: null,
    isFetching: false,
  },
  reducers: {
    fetchingHousingListings: (state) => {
      state.isFetching = true;
    },
    fetchHousingListingsSuccess: (state, action) => {
      state.city_id = action.payload.city_id;
      state.data.housingListings = action.payload.housingListings;
      state.data.filteredHListings = orderByListings(
        action.payload.housingListings,
      );
      state.data.orderBy = action.payload.orderBy;
      state.isFetching = false;
    },
    setHousingOrderBy: (state, action) => {
      state.data.orderBy = action.payload.orderBy;
      state.data.filteredHListings = filterListings(
        state.data.housingListings,
        state.data.filters,
        state.data.orderBy,
      );
      state.isFetching = false;
    },
    setHousingFilters: (state, action) => {
      state.data.filters = action.payload.filters;
      state.data.filteredHListings = filterListings(
        state.data.housingListings,
        state.data.filters,
        state.data.orderBy,
      );
      state.isFetching = false;
    },
  },
});

export const {
  fetchHousingListingsSuccess,
  fetchingHousingListings,
  setHousingFilters,
  setHousingOrderBy,
} = HousingSlice.actions;
export default HousingSlice.reducer;
