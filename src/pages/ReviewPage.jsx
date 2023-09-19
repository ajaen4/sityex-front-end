import React from "react"
import { connect } from 'react-redux'

import { withAuth } from 'session'

import ReviewForm from 'components/Forms/ReviewForm'


const ReviewPage = ({selectedCity, citiesIndex}) => {

  return (
    <div style = {{justifyContent: "center", textAlign: "center"}}>
      <h2 className = "bold"> Fill in an review </h2>
      <ReviewForm
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

export default connect(mapStateToProps)(withAuth(ReviewPage))
