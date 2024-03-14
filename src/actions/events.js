import * as api from "api";

import {
  isFetchingEvents,
  fetchingEventsSuccess,
  fetchingEventSuccess,
} from "store/reducers/events";

export const getCityEvents = (city_id) => (dispatch, getState) => {
  if (getState().events.city_id !== city_id) {
    dispatch(isFetchingEvents());
    api.getCityEvents(city_id).then((events) => {
      dispatch(fetchingEventsSuccess({ events, city_id }));
    });
  }
};

export const getCityEvent = (city_id, event_id) => (dispatch, getState) => {
  if (getState().events.selected_event?.event_id === event_id) {
    dispatch(isFetchingEvents());
    dispatch(
      fetchingEventSuccess({
        selected_event: getState().events.data.events.find(
          (event) => event.event_id === event_id,
        ),
      }),
    );
  }

  api.getCityEvent(city_id, event_id).then((selected_event) => {
    dispatch(fetchingEventSuccess({ selected_event }));
  });
};
