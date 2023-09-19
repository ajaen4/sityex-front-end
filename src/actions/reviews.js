
import *  as api from 'api'

import {
  SAVING_review
} from 'types'

export const getreviews = cityName => api.getreviews(cityName)

export const addreview = (cityName, review, markers) => (dispatch, getState) =>  {
  dispatch({type: SAVING_review})
  return api.addreview(cityName, review, markers)
}
