import * as api from "api";

import {
  requestingAllCountries,
  fetchAllCountriesSuccess,
} from "store/reducers/allCountries";

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
