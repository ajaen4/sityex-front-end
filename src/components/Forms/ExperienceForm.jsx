
import React from 'react'
import { connect } from 'react-redux'

import ExperienceFormBase from './ExperienceFormBase'

const ExperienceForm = ({selectedCity, onChangeCity, citiesIndex, windowDimensions, dispatch, auth}) => {

  return (
    <ExperienceFormBase
      selectedCity = {selectedCity}
      onChangeCity = {onChangeCity}
      citiesIndex = {citiesIndex}
      windowDimensions = {windowDimensions}
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
