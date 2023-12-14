import * as api from "api";

import {
  requestingCountry,
  fetchCountrySuccess,
} from "store/reducers/selectedCountry";

import {
  requestingAllCountries,
  fetchAllCountriesSuccess,
} from "store/reducers/allCountries";

export const fetchCountry = (country_3_code) => (dispatch, getState) => {
  if (
    getState().selectedCountry.data !== null &&
    getState().selectedCountry.data.country_3_code === country_3_code
  ) {
    return Promise.resolve();
  }

  dispatch(requestingCountry());
  return api.getCountry(country_3_code).then((data) => {
    dispatch(fetchCountrySuccess({ countryData: data }));
  });
};

export const fetchCountries = () => (dispatch, getState) => {
  if (getState().allCountries.data !== null) {
    return Promise.resolve();
  }

  dispatch(requestingAllCountries());
  return api.getCountries().then((data) => {
    dispatch(
      fetchAllCountriesSuccess({
        allCountriesData: data,
      }),
    );
  });
};
