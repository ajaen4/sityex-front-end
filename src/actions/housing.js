import * as api from "api";

import {
  requestingHousingIndex,
  fetchHousingIndexSuccess,
} from "store/reducers/housing";

import { sortListings } from "helpers/listUtils";

export const fetchHousingIndex = (city_id, sortBy) => (dispatch, getState) => {
  const current_city_id = getState().housing.data?.city_id;
  if (current_city_id === city_id) {
    return Promise.resolve();
  }
  dispatch(requestingHousingIndex());
  return api.getHousingIndex(city_id).then((data) => {
    if (sortBy) {
      data.listings = sortListings(data.listings, sortBy);
    }

    dispatch(
      fetchHousingIndexSuccess({
        housingIndex: data,
      }),
    );
  });
};

export const fetchHousingListing = (city_id, housing_id) => {
  return api.getHousingListing(city_id, housing_id);
};

export const orderHousingIndex = (sortBy) => (dispatch, getState) => {
  const currHousingIndex = getState().housing.data.listings;

  dispatch(
    fetchHousingIndexSuccess({
      housingIndex: { listings: sortListings(currHousingIndex, sortBy) },
    }),
  );
};
