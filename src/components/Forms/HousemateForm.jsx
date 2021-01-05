
import React from 'react'
import { connect } from 'react-redux'

import HousemateFormBase from './HousemateFormBase'

const HousemateForm = ({selectedCity, onChangeCity, citiesIndex, dispatch, savingExpState, isAuthResolved, auth}) => {

  return (
    <HousemateFormBase
      selectedCity = {selectedCity}
      onChangeCity = {onChangeCity}
      citiesIndex = {citiesIndex}
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

export default connect(mapStateToProps)(HousemateForm)
