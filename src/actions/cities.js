
import {
  REQUESTING_CITIES_INDEX,
  FETCH_CITIES_INDEX_SUCCESS,
  REQUESTING_CITY,
  FETCH_CITY_SUCCESS } from 'types'

import { objectIsEmpty } from 'helpers/usefulFunctions'
import *  as api from 'api'

export const fetchCitiesIndex = () => (dispatch, getState) => {

  if(!objectIsEmpty(getState().citiesIndex.data)) { return Promise.resolve() }
  //Dispatch so "isFetching" is true
  dispatch({type: REQUESTING_CITIES_INDEX})
  return api.getCitiesIndex()
        .then(data => {
          dispatch({
            type: FETCH_CITIES_INDEX_SUCCESS,
            citiesIndex: data
          })
        })
}

export const fetchCity = cityName => (dispatch, getState) => {
  
  if(getState().selectedCity.data !== null && getState().selectedCity.data.name === cityName) { return Promise.resolve() }

  dispatch({type: REQUESTING_CITY})
  return api.getCity(cityName)
        .then(data => {
          dispatch({
            type: FETCH_CITY_SUCCESS,
            cityData: data
          })
        })
}