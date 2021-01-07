
import React, {useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

//Custom funcionality
import { withAuth } from 'session'
import { prettyCity } from 'helpers/usefulFunctions'
import { fetchCity, getExperiences, getHousemates } from 'actions'

//reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap"

//Custom UI components
import DestinationPageHeader from "components/Headers/DestinationPageHeader"
import DefaultFooter from "components/Footers/DefaultFooter"
import RecomenMap from 'components/GoogleMaps/RecomenMap'
import ScrollExperiences from 'components/ScrollList/ScrollExperiences'
import ScrollHousemates from 'components/ScrollList/ScrollHousemates'
import CityInfo from 'components/CityData/CityInfo'
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'

const DestinationPage = ({selectedCity, dispatch}) => {

  const [pills, setPills] = useState("1")
  const [experiences, setExperiences] = useState([])
  const [housemates, setHousemates] = useState([])

  const { location } = useParams()

  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(console.log, console.log)
  }

  useEffect(() => {
    document.body.classList.add("profile-page")
    return function cleanup() {
      document.body.classList.remove("profile-page")
    }
  })

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)))

    getExperiences(prettyCity(location))
    .then((experiences) => {
      setExperiences(experiences.sort((a, b) => b.timeStamp - a.timeStamp))
    })

    getHousemates(prettyCity(location))
    .then((housemates) => {
      setHousemates(housemates.sort((a, b) => b.timeStamp - a.timeStamp))
    })

  }, [dispatch, location])

  if(selectedCity === null || (selectedCity.name !== prettyCity(location))) return <CenteredLoadingSpinner/>

  return (
    <>
        <DestinationPageHeader cityName = {selectedCity.displayName} countryName = {selectedCity.countryName} numExp = {experiences.length} numHousemates = {housemates.length}/>
        <div className="mySection">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Follow
              </Button>
            </div>
            <Row>
              <Col>
            <h3 className="title capitalize centerText">Características</h3>
              <CityInfo cityData = {selectedCity} />
              </Col>
            </Row>
            <Row>
              <Col style = {{marginTop: "0px"}}>
                <h3 style = {{marginTop: "0px"}} className="title text-center">Áreas</h3>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href=""
                        onClick={e => {
                          e.preventDefault()
                          setPills("1")
                        }}
                      >
                        <i className="now-ui-icons emoticons_satisfied"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href=""
                        onClick={e => {
                          e.preventDefault()
                          setPills("2")
                        }}
                      >
                        <i className="now-ui-icons shopping_shop"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href=""
                        onClick={e => {
                          e.preventDefault()
                          setPills("3")
                        }}
                      >
                        <i className="now-ui-icons location_map-big"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              </Row>
          <TabContent className="gallery" activeTab={"pills" + pills} sm = "11" md = "11" lg = "11" style = {{width: "100%"}}>
            <TabPane tabId="pills1">
              <Row style = {{justifyContent: "center"}}>
                <Col sm = "12" md = "12" lg = "12" >
                  <ScrollExperiences experiences = {experiences}/>
                </Col>
              </Row>
              </TabPane>
              <TabPane tabId="pills2">
                <Row style = {{justifyContent: "center"}}>
                  <Col sm = "12" md = "12" lg = "12" >
                    <ScrollHousemates housemates = {housemates}/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="pills3">
              <Row style = {{justifyContent: "center"}}>
                <Col sm = "12" md = "12" lg = "12">
                  <div style = {{
                    justifyContent: "center"
                    }}>
                    <RecomenMap
                    coordinates = {{lat: selectedCity.latitude, lng: selectedCity.longitude }}
                    recomendations = {selectedCity.mapMarkers === undefined ? [] : selectedCity.mapMarkers}/>
                  </div>
                </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
        </div>
        <DefaultFooter />
    </>
    )

}

const mapStateToProps = state => ({selectedCity: state.selectedCity.data})

export default connect(mapStateToProps)(withAuth(DestinationPage))
