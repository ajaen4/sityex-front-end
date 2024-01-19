import * as api from "api";

import {
  requestingHousingIndex,
  fetchHousingIndexSuccess,
} from "store/reducers/housing";

export const fetchHousingIndex = (city_id) => (dispatch, getState) => {
  const current_city_id = getState().housing.data?.city_id;
  if (current_city_id === city_id) {
    return Promise.resolve();
  }
  dispatch(requestingHousingIndex());
  return api.getHousingIndex(city_id).then((data) => {
    dispatch(
      fetchHousingIndexSuccess({
        housingIndex: data,
      }),
    );
  });
};

export const fetchHousingListing = async (city_id, housing_id) => {
  return api.getHousingListing(city_id, housing_id);
};
