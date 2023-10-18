import * as api from "api";

import {
  SAVING_REVIEW,
  SAVING_REVIEW_SUCCESS,
  FETCHING_REVIEWS,
  FETCHING_REVIEWS_SUCCESS
} from "types";

export const getReviews = (city_id) => (dispatch, getState) => {
  if (getState().reviews.data.city_id !== city_id) {
    dispatch({ type: FETCHING_REVIEWS });
    api.getReviews(city_id).then((reviews) => {
      dispatch({ type: FETCHING_REVIEWS_SUCCESS, reviews, city_id });
    });
  }
};

export const addReview = (city_id, review, recomendations) => (dispatch, _) => {
  dispatch({ type: SAVING_REVIEW });
  return api.addReview(city_id, review, recomendations).then((_) => {
    dispatch({
      type: SAVING_REVIEW_SUCCESS
    });
  });
};
