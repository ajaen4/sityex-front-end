import * as api from "api";

import { SAVING_REVIEW, SAVING_REVIEW_SUCCESS } from "types";

export const getReviews = (city_id) => api.getReviews(city_id);

export const addReview = (city_id, review, recomendations) => (dispatch, _) => {
  dispatch({ type: SAVING_REVIEW });
  return api.addReview(city_id, review, recomendations).then((_) => {
    dispatch({
      type: SAVING_REVIEW_SUCCESS,
    });
  });
};
