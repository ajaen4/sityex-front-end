import React, {useEffect} from "react"
import { connect } from 'react-redux'

//Custom functionality
import { withAuth } from 'session'
import { prettyCity } from 'helpers/usefulFunctions'
import { fetchCitiesIndex, fetchCity, addExperience } from 'actions'

//reactstrap components
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap"

//Custom UI components
import DefaultFooter from "components/Footers/DefaultFooter"
import NewExperienceForm from 'components/Forms/NewExperienceForm'


const NewExperiencePage = ({dispatch, selectedCity, citiesIndex}) => {

  const INITIALCITY = "Aachen"

  const [windowDimensions, setWindowDimensions] = React.useState(window.innerWidth)

  useEffect(() => {
    dispatch(fetchCity(prettyCity(INITIALCITY)))
    dispatch(fetchCitiesIndex())
  }, [dispatch])

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions)
    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  })

  //Updates the window dimensions (width) when this changes
  const updateWindowDimensions = () => {
    setWindowDimensions(window.innerWidth)
  }

  //Fetch city data if the user changes the city in the dropdown list
  const onChangeCity = event => {
    dispatch(fetchCity(prettyCity(event.target.value)))
  }

  return (
    <>
      <div style = {{justifyContent: "center", textAlign: "center"}}>
        <h2 className = "bold" style = {{marginTop: "100px"}}> Rellenar experiencia </h2>
        <NewExperienceForm
          selectedCity = {selectedCity}
          onChangeCity = {onChangeCity}
          citiesIndex = {citiesIndex}
          windowDimensions = {windowDimensions}/>
      </div>
      <DefaultFooter />
    </>
  )
}

const mapStateToProps = state => ({
  citiesIndex: state.citiesIndex.data,
  selectedCity: state.selectedCity.data
})

export default connect(mapStateToProps)(withAuth(NewExperiencePage))
