import { combineReducers } from "redux";

import {
  SAVING_PLACE,
  SAVING_PLACE_SUCCESS,
  FETCHING_PLACES_SUCCESS
} from "types";

const INITIAL_STATE = { places: [], city_id: null };

const initPlaces = () => {
  const isFetching = (state = false, action) => {
    switch (action.type) {
      case SAVING_PLACE:
        return true;
      case SAVING_PLACE_SUCCESS:
        return false;
      default:
        return state;
    }
  };

  const data = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCHING_PLACES_SUCCESS:
        return { places: action.places, city_id: action.city_id };
      default:
        return state;
    }
  };

  return combineReducers({
    isFetching,
    data
  });
};

const places = initPlaces();

export default places;
