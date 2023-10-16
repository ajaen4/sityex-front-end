import { combineReducers } from "redux";

import { FETCH_COUNTRY_SUCCESS, REQUESTING_COUNTRY } from "types";

const INITIAL_STATE = null;

const initSelectedCountry = () => {
  const data = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_COUNTRY_SUCCESS:
        return action.countryData;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case REQUESTING_COUNTRY:
        return true;
      case FETCH_COUNTRY_SUCCESS:
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

const selectedCountry = initSelectedCountry();

export default selectedCountry;
