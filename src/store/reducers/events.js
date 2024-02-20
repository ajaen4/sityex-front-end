import { createSlice } from "@reduxjs/toolkit";
import { filterEvents, getCategories, groupEvents } from "helpers/listUtils.js";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    data: {
      groupedEvent: [],
      categories: [],
      selectedEvent: null,
      orderBy: "",
    },
    city_id: null,
    isFetching: false,
  },
  reducers: {
    isFetchingEvents: (state, action) => {
      state.isFetching = true;
    },
    fetchingEventsSuccess: (state, action) => {
      const categories = getCategories(action.payload.events);
      state.data.categories = categories;
      const groupedEvents = groupEvents(categories, action.payload.events);
      state.data.groupedEvents = groupedEvents;
      state.city_id = action.payload.city_id;
      state.data.selectedEvent = null;
    },
    fetchingEventSuccess: (state, action) => {
      state.data.selectedEvent = action.payload.selected_event;
    },
    setEventsOrderBy: (state, action) => {
      const orderBy = action.payload.orderBy;
      state.data.orderBy = orderBy;
      state.data.filteredGEvents = filterEvents(
        state.data.groupedEvents,
        orderBy,
      );
    },
  },
});

export const {
  isFetchingEvents,
  fetchingEventsSuccess,
  fetchingEventSuccess,
  setEventsOrderBy,
} = eventsSlice.actions;

export default eventsSlice.reducer;
