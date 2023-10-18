import * as api from "api";

import { FETCHING_PLACES, FETCHING_PLACES_SUCCESS } from "types";

export const getCityPlaces = (city_id) => (dispatch, getState) => {
  if (getState().places.data.city_id !== city_id) {
    dispatch({ type: FETCHING_PLACES });
    api.getCityPlaces(city_id).then((places) => {
      dispatch({ type: FETCHING_PLACES_SUCCESS, places, city_id });
    });
  }
};
