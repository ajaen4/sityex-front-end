import * as api from "api";

import {
  FETCHING_EVENTS,
  FETCHING_EVENTS_SUCCESS,
  FETCHING_EVENT,
  FETCHING_EVENT_SUCCESS
} from "types";

export const getCityEvents = (city_id) => (dispatch, getState) => {
  if (getState().events.data.city_id !== city_id) {
    dispatch({ type: FETCHING_EVENTS });
    api.getCityEvents(city_id).then((events) => {
      dispatch({ type: FETCHING_EVENTS_SUCCESS, events, city_id });
    });
  }
};

export const getCityEvent = (city_id, event_id) => (dispatch, getState) => {
  if (getState().events.data.selected_event?.sku === event_id) {
    dispatch({ type: FETCHING_EVENT });
    dispatch({
      type: FETCHING_EVENT_SUCCESS,
      selected_event: getState().events.data.events.find(
        (event) => event.sku === event_id
      )
    });
  }

  api.getCityEvent(city_id, event_id).then((selected_event) => {
    dispatch({ type: FETCHING_EVENT_SUCCESS, selected_event });
  });
};

export const setUserInterested = (
  city_id,
  event_id,
  user_id,
  interested_info
) => {
  api.setUserInterested(city_id, event_id, user_id, interested_info);
};

export const countInterestedUsers = (city_id, event_id, user_id) => {
  return api.countInterestedUsers(city_id, event_id, user_id);
};
