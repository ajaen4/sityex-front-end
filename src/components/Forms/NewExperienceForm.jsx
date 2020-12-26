
import React from 'react'
import { connect } from 'react-redux'

import NewExperienceFormBase from './NewExperienceFormBase'

const NewExperienceForm = ({selectedCity, onChangeCity, citiesIndex, windowDimensions, dispatch, savingExpState, isAuthResolved, auth}) => {

  return (
    <NewExperienceFormBase
      selectedCity = {selectedCity}
      onChangeCity = {onChangeCity}
      citiesIndex = {citiesIndex}
      windowDimensions = {windowDimensions}
      dispatch = {dispatch}
      savingExpState = {savingExpState}
      isAuthResolved = {isAuthResolved}
      auth = {auth}/>
  )
}

const mapStateToProps = state => ({
  savingExpState: state.experiences.state,
  auth: state.authUser.data,
  isAuthResolved: state.authUser.isAuthResolved
})

export default connect(mapStateToProps)(NewExperienceForm)
