import { createSlice } from "@reduxjs/toolkit";

const HousingSlice = createSlice({
  name: "housing",
  initialState: {
    data: {
      index: null,
      city_id: null,
      pagesListings: [],
      lastVisibleDocId: null,
      orderBy: null,
    },
    filters: null,
    isFetching: false,
  },
  reducers: {
    requestingHousingIndex: (state) => {
      state.isFetching = true;
    },
    fetchHousingIndexSuccess: (state, action) => {
      state.data.index = action.payload.index;
      state.data.city_id = action.payload.city_id;
      state.isFetching = false;
    },
    resetHousingPage: (state, _) => {
      state.data.pagesListings = [];
      state.data.lastVisibleDocId = null;
      state.data.orderBy = null;
      state.isFetching = false;
    },
    fetchHousingPageSuccess: (state, action) => {
      state.data.pagesListings[action.payload.pageNum] =
        action.payload.pageListings;
      state.data.lastVisibleDocId = action.payload.lastVisibleDocId;
      state.data.orderBy = action.payload.orderBy;
      state.isFetching = false;
    },
  },
});

export const {
  requestingHousingIndex,
  fetchHousingIndexSuccess,
  fetchHousingPageSuccess,
  resetHousingPage,
} = HousingSlice.actions;
export default HousingSlice.reducer;
