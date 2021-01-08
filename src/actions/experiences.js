
import *  as api from 'api'

import {
  SAVING_EXPERIENCE
} from 'types'

export const getExperiences = cityName => api.getExperiences(cityName)

export const addExperience = (cityName, experience, markers) => (dispatch, getState) =>  {
  dispatch({type: SAVING_EXPERIENCE})
  return api.addExperience(cityName, experience, markers)
}
