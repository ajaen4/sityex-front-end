import { combineReducers } from "redux";

import { FETCHING_EVENTS_SUCCESS, FETCHING_EVENT_SUCCESS } from "types";

const INITIAL_STATE = { events: [], city_id: null };

const initEvents = () => {
  const isFetching = (state = false, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  const data = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCHING_EVENTS_SUCCESS:
        return {
          events: action.events,
          city_id: action.city_id,
          selectedEvent: null
        };
      case FETCHING_EVENT_SUCCESS:
        return {
          selectedEvent: action.selected_event,
          events: state.events,
          city_id: state.city_id
        };
      default:
        return state;
    }
  };

  return combineReducers({
    isFetching,
    data
  });
};

const events = initEvents();

export default events;
