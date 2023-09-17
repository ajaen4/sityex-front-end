
import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { prettyCity } from 'helpers/usefulFunctions'
import { fetchCity } from 'actions'

import ExperienceFormBase from './ExperienceFormBase'

const ExperienceForm = ({selectedCity, citiesIndex, dispatch, auth}) => {

  const INITIALCITY = "Aachen"

  useEffect(() => {
    dispatch(fetchCity(prettyCity(INITIALCITY)))
  }, [dispatch])

  //Fetch city data if the user changes the city in the dropdown list
  const onChangeCity = event => {
    dispatch(fetchCity(prettyCity(event.target.value)))
  }

  return (
    <ExperienceFormBase
      selectedCity = {selectedCity}
      onChangeCity = {onChangeCity}
      citiesIndex = {citiesIndex}
      dispatch = {dispatch}
      auth = {auth}/>
  )
}

const mapStateToProps = state => ({
  savingExpState: state.experiences.state,
  auth: state.auth.data,
  isAuthResolved: state.auth.isAuthResolved
})

export default connect(mapStateToProps)(ExperienceForm)
