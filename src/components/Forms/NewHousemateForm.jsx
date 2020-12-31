
import React from 'react'
import { connect } from 'react-redux'

import NewHousemateFormBase from './NewHousemateFormBase'

const NewHousemateForm = ({selectedCity, onChangeCity, citiesIndex, windowDimensions, dispatch, savingExpState, isAuthResolved, auth}) => {

  return (
    <NewHousemateFormBase
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

export default connect(mapStateToProps)(NewHousemateForm)
