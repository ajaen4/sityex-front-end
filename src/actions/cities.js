import { objectIsEmpty } from "helpers/usefulFunctions";
import * as api from "api";

import {
  requestingCitiesIndex,
  fetchCitiesIndexSuccess,
} from "store/reducers/citiesIndex";
import { requestingCity, fetchCitySuccess } from "store/reducers/selectedCity";

export const fetchCitiesIndex = () => (dispatch, getState) => {
  if (!objectIsEmpty(getState().citiesIndex.data)) {
    return Promise.resolve();
  }
  dispatch(requestingCitiesIndex());
  return api.getCitiesIndex().then((data) => {
    dispatch(
      fetchCitiesIndexSuccess({
        citiesIndex: data,
      }),
    );
  });
};

export const fetchCity = (city_id) => (dispatch, getState) => {
  if (
    getState().selectedCity.data !== null &&
    getState().selectedCity.data.city_id === city_id
  ) {
    return Promise.resolve();
  }

  dispatch(requestingCity());
  return api.getCity(city_id).then((data) => {
    dispatch(
      fetchCitySuccess({
        cityData: data,
      }),
    );
  });
};
