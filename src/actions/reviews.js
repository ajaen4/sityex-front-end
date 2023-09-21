import * as api from "api";

import { SAVING_REVIEW, SAVING_REVIEW_SUCCESS } from "types";

export const getReviews = (cityName) => api.getReviews(cityName);

export const addReview =
  (cityName, review, recomendations) => (dispatch, _) => {
    dispatch({ type: SAVING_REVIEW });
    return api.addReview(cityName, review, recomendations).then((_) => {
      dispatch({
        type: SAVING_REVIEW_SUCCESS,
      });
    });
  };
