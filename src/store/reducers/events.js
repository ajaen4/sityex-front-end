import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    city_id: null,
    selectedEvent: null,
    isFetching: false,
  },
  reducers: {
    isFetchingEvents: (state, action) => {
      state.isFetching = true;
    },
    fetchingEventsSuccess: (state, action) => {
      state.events = action.payload.events;
      state.city_id = action.payload.city_id;
      state.selectedEvent = null;
    },
    fetchingEventSuccess: (state, action) => {
      state.selectedEvent = action.payload.selected_event;
    },
  },
});

export const { isFetchingEvents, fetchingEventsSuccess, fetchingEventSuccess } =
  eventsSlice.actions;

export default eventsSlice.reducer;
