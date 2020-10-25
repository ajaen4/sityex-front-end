
import React from 'react'
import { connect } from 'react-redux'

import NewExperienceFormBase from './NewExperienceFormBase'

const NewExperienceForm = ({selectedCity, onChangeCity, citiesIndex, windowDimensions, dispatch, savingExpState}) => {

  return (
    <>
      <NewExperienceFormBase
        selectedCity = {selectedCity}
        onChangeCity = {onChangeCity}
        citiesIndex = {citiesIndex}
        windowDimensions = {windowDimensions}
        dispatch = {dispatch}
        savingExpState = {savingExpState}/>
    </>
  )
}

const mapStateToProps = state => ({
  savingExpState: state.experiences.state
})

export default connect(mapStateToProps)(NewExperienceForm)
