
import *  as api from 'api'

import {
  SAVING_REVIEW
} from 'types'

export const getReviews = cityName => api.getReviews(cityName)

export const addReview = (cityName, review, markers) => (dispatch, _) =>  {
  dispatch({type: SAVING_REVIEW})
  return api.addReview(cityName, review, markers)
}
