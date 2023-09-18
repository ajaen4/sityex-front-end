import React from "react"
import { connect } from 'react-redux'

import { withAuth } from 'session'

import ExperienceForm from 'components/Forms/ExperienceForm'


const ExperiencePage = ({selectedCity, citiesIndex}) => {

  return (
    <div style = {{justifyContent: "center", textAlign: "center"}}>
      <h2 className = "bold"> Rellenar experiencia </h2>
      <ExperienceForm
        selectedCity = {selectedCity ? selectedCity : {name: "Aachen", countryName: "Germany", latitude: 50.776351, longitude: 6.083862}}
        citiesIndex = {citiesIndex !== null ? citiesIndex : []}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  citiesIndex: state.citiesIndex.data,
  selectedCity: state.selectedCity.data
})

export default connect(mapStateToProps)(withAuth(ExperiencePage))
