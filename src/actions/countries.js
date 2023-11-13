import {
  REQUESTING_COUNTRY,
  FETCH_COUNTRY_SUCCESS,
  REQUESTING_ALL_COUNTRIES,
  FETCH_ALL_COUNTRIES_SUCCESS
} from "types";

import * as api from "api";

export const fetchCountry = (country_3_code) => (dispatch, getState) => {
  if (
    getState().selectedCountry.data !== null &&
    getState().selectedCountry.data.country_3_code === country_3_code
  ) {
    return Promise.resolve();
  }

  dispatch({ type: REQUESTING_COUNTRY });
  return api.getCountry(country_3_code).then((data) => {
    dispatch({
      type: FETCH_COUNTRY_SUCCESS,
      countryData: data
    });
  });
};

export const fetchCountries = () => (dispatch, getState) => {
  if (getState().allCountries.data !== null) {
    return Promise.resolve();
  }

  dispatch({ type: REQUESTING_ALL_COUNTRIES });
  return api.getCountries().then((data) => {
    dispatch({
      type: FETCH_ALL_COUNTRIES_SUCCESS,
      allCountriesData: data
    });
  });
};
