import { createSlice } from "@reduxjs/toolkit";
import {
  filterEvents,
  getUsedSubcategories,
  groupEvents,
} from "helpers/listUtils.js";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    data: {
      groupedEvent: [],
      usedSubcategories: [],
      selectedEvent: null,
      filters: null,
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
      const usedSubcategories = getUsedSubcategories(action.payload.events);
      state.data.usedSubcategories = usedSubcategories;
      state.data.groupedEvents = groupEvents(
        usedSubcategories,
        action.payload.events
      );
      state.city_id = action.payload.city_id;
      state.data.selectedEvent = null;
    },
    fetchingEventSuccess: (state, action) => {
      state.data.selectedEvent = action.payload.selected_event;
    },
    setEventsOrderBy: (state, action) => {
      state.data.orderBy = action.payload.orderBy;
      filterEvents(state.data.groupedEvents, state.data.orderBy);
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
