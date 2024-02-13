import * as api from "api";

import {
  requestingHousingIndex,
  fetchHousingIndexSuccess,
  fetchHousingPageSuccess,
  resetHousingPage,
} from "store/reducers/housing";

export const fetchHousingIndex = (city_id) => (dispatch, getState) => {
  const current_city_id = getState().housing.data.city_id;
  if (current_city_id === city_id) {
    return Promise.resolve();
  }
  dispatch(requestingHousingIndex());
  return api.getHousingIndex(city_id).then((data) => {
    dispatch(
      fetchHousingIndexSuccess({
        index: data.index,
        city_id: city_id,
      })
    );
  });
};

export const fetchHousingPage =
  (city_id, pageNum, orderBy) => (dispatch, getState) => {
    const maxPageNum = getState().housing.data.pagesListings.length - 1;
    const lastVisibleDocId = getState().housing.data.lastVisibleDocId;

    const newOrderBy = getState().housing.data.orderBy !== orderBy;

    if (newOrderBy) {
      resetHousingPage();
    }

    if (newOrderBy || pageNum > maxPageNum) {
      return api
        .getHousingPage(city_id, lastVisibleDocId, orderBy)
        .then((data) => {
          dispatch(
            fetchHousingPageSuccess({
              pageNum: pageNum,
              pageListings: data,
              lastVisibleDocId: data[data.length - 1].housing_id,
              orderBy: orderBy,
            })
          );
        });
    }
  };

export const fetchHousingListing = (city_id, housing_id) => {
  return api.getHousingListing(city_id, housing_id);
};
