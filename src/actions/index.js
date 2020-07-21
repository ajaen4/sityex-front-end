
import {
  REQUESTING_CITIES_INDEX,
  FETCH_CITIES_INDEX_SUCCESS,
  REQUESTING_CITY,
  FETCH_CITY_SUCCESS,
  REQUESTING_UPDATE_MARKERS,
  UPDATE_MARKERS_SUCCESS } from 'types'

import { objectIsEmpty } from 'helpers/usefulFunctions'

import { db } from 'db'

import { createUser, logInUser } from './authentication'

export { createUser, logInUser }

export const fetchCitiesIndex = () => (dispatch, getState) => {

  if(!objectIsEmpty(getState().citiesIndex.data)) { return Promise.resolve() }
  //Dispatch so "isFetching" is true
  dispatch({type: REQUESTING_CITIES_INDEX})
  return db.doGetCitiesIndex()
        .then(data => {
          dispatch({
            type: FETCH_CITIES_INDEX_SUCCESS,
            citiesIndex: data
          })
        })
}

export const fetchCity = cityName => (dispatch, getState) => {

  debugger
  if(getState().selectedCity.data.name === cityName) { return Promise.resolve() }

  dispatch({type: REQUESTING_CITY})
  return db.doGetCity(cityName)
        .then(data => {
          dispatch({
            type: FETCH_CITY_SUCCESS,
            cityData: data
          })
        })
}

export const updateMarkers = (cityName, markers) => (dispatch, getState) => {
  dispatch({type: REQUESTING_UPDATE_MARKERS})
  return db.doUpdateMarkers(cityName, markers)
        .then(response => {
          dispatch({
            type: UPDATE_MARKERS_SUCCESS,
            message: response
          })
        })
}
