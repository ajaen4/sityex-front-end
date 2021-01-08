
import *  as api from 'api'

import {
  SAVING_HOUSEMATE
} from 'types'

export const getHousemates = cityName => api.getHousemates(cityName)

export const addHousemate = (cityName, housemateData) => (dispatch, getState) =>  {
  dispatch({type: SAVING_HOUSEMATE})
  return api.addHousemate(cityName, housemateData)
}
