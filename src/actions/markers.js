
import {
  REQUESTING_UPDATE_MARKERS,
  UPDATE_MARKERS_SUCCESS } from 'types'

import * as api from 'api'

export const updateMarkers = (cityName, markers) => (dispatch, getState) => {
  dispatch({type: REQUESTING_UPDATE_MARKERS})
  return api.doUpdateMarkers(cityName, markers)
        .then(response => {
          dispatch({
            type: UPDATE_MARKERS_SUCCESS,
            message: response
          })
        })
}
