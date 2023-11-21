import { combineReducers } from "redux";

import { FETCH_ALL_COUNTRIES_SUCCESS, REQUESTING_ALL_COUNTRIES } from "types";

const INITIAL_STATE = null;

const initAllCountries = () => {
  const data = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_ALL_COUNTRIES_SUCCESS:
        return action.allCountriesData;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case FETCH_ALL_COUNTRIES_SUCCESS:
        return true;
      case REQUESTING_ALL_COUNTRIES:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    data,
    isFetching
  });
};

const allCountries = initAllCountries();

export default allCountries;
