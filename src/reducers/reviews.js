import { combineReducers } from "redux";

import { SAVING_REVIEW, SAVING_REVIEW_SUCCESS } from "types";

const initReviews = () => {
  const isFetching = (state = false, action) => {
    switch (action.type) {
      case SAVING_REVIEW:
        return true;
      case SAVING_REVIEW_SUCCESS:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    isFetching,
  });
};

const reviews = initReviews();

export default reviews;
