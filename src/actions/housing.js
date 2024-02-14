import * as api from "api";

import {
  fetchHousingListingsSuccess,
  fetchingHousingListings,
  setHousingOrderBy,
  setHousingFilters,
} from "store/reducers/housing";

export const fetchHousingListings = (city_id, limit) => (dispatch, _) => {
  dispatch(fetchingHousingListings());

  return api.getHousingListings(city_id, limit).then((data) => {
    dispatch(
      fetchHousingListingsSuccess({
        housingListings: data,
      }),
    );
  });
};

export const updateHousingOrderBy = (orderBy) => (dispatch, _) => {
  dispatch(
    setHousingOrderBy({
      orderBy: orderBy,
    }),
  );
};

export const updateHousingFilters = (filters) => (dispatch, _) => {
  dispatch(
    setHousingFilters({
      filters: filters,
    }),
  );
};

export const fetchHousingListing = (city_id, housing_id) => {
  return api.getHousingListing(city_id, housing_id);
};

export const fetchListingImages = (city_id, housing_id) => {
  return api.getListingImages(city_id, housing_id);
};
