import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    data: {
      events: [],
      selectedEvent: null,
    },
    city_id: null,
    isFetching: false,
  },
  reducers: {
    isFetchingEvents: (state, action) => {
      state.isFetching = true;
    },
    fetchingEventsSuccess: (state, action) => {
      state.data.events = action.payload.events;
    },
    fetchingEventSuccess: (state, action) => {
      state.data.selectedEvent = action.payload.selected_event;
    },
  },
});

export const { isFetchingEvents, fetchingEventsSuccess, fetchingEventSuccess } =
  eventsSlice.actions;

export default eventsSlice.reducer;
