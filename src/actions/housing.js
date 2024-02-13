import * as api from "api";

import {
  fetchHousingPageSuccess,
  fetchingHousingPage,
} from "store/reducers/housing";

export const fetchHousingPage =
  (city_id, orderBy, limit) => (dispatch, getState) => {
    dispatch(fetchingHousingPage());

    return api.getHousingPage(city_id, orderBy, limit).then((data) => {
      dispatch(
        fetchHousingPageSuccess({
          pageListings: data,
          orderBy: orderBy,
        })
      );
    });
  };

export const fetchHousingListing = (city_id, housing_id) => {
  return api.getHousingListing(city_id, housing_id);
};

export const fetchListingImages = (city_id, housing_id) => {
  return api.getListingImages(city_id, housing_id);
};
