import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

//Custom functionality
import { withAuth } from 'session'
import { objectIsEmpty } from 'helpers/usefulFunctions'

//reactstrap components
import{
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap"

//Custom UI components
import DefaultFooter from "components/Footers/DefaultFooter"
import ScrollDestinations from "components/ScrollList/ScrollDestinations"
import DestinationsMap from 'components/GoogleMaps/DestinationsMap'
import JustLoggedInModal from 'components/Modals/JustLoggedInModal'
import UserJustCreatedModal from 'components/Modals/UserJustCreatedModal'

const HomePage = ({citiesIndex, isFetching, authUser}) => {

  const [pills, setPills] = useState("1")
  const [city, setCity] = useState('')
  const [windowWidth, setwindowWidth] = React.useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", updatewindowWidth)
    return function cleanup() {
      window.removeEventListener("resize", updatewindowWidth)
    }
  })

  //Updates the window dimensions (width) when this changes
  const updatewindowWidth = () => {
    setwindowWidth(window.innerWidth)
  }

  const onSearchChange = event => setCity(event.target.value)

  return (
    <>
      <JustLoggedInModal justLoggedIn = {authUser.justLoggedIn} title = "Inicio de sesion" message = "Se ha iniciado sesion correctamente"/>
      <UserJustCreatedModal userJustCreated = {authUser.userJustCreated} title = "Nuevo usuario" message = "Se ha creado el usuario correctamente"/>
      <Container style = {{
        marginTop: "100px",
        textAlign: "center",
        justifyContent: "center"
      }}>
        <div className="nav-align-center">
          <Nav
          className="nav-pills-info nav-pills-just-icons"
          pills
          role="tablist">
            <NavItem>
              <NavLink
                className={pills === "1" ? "active" : ""}
                href=""
                onClick={e => {
                  e.preventDefault()
                  setPills("1")
                }}
              >
                <i className="now-ui-icons design_bullet-list-67"></i>
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
                <i className="now-ui-icons location_map-big"></i>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent className="gallery" activeTab={"pills" + pills} sm = "11" md = "11" lg = "11" style = {{width: "100%"}}>
          <TabPane tabId="pills1">
            <Row style ={{marginTop: "50px", justifyContent: "center"}}>
              <Col lg = "6" md = "9">
              <Card>
                <CardBody>
                <CardTitle style={{
                  color: "grey",
                  fontSize: "2em",
                  marginTop: "0px",
                }}>Introduce un destino</CardTitle>
                <InputGroup
                  className = "form-control-lg input-group-focus"
                  >
                  <InputGroupAddon addonType = "prepend">
                    <InputGroupText>
                      <i className = "now-ui-icons location_world"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      name = "location"
                      placeholder = {"Ej. Turin..."}
                      type = "text"
                      value = {city}
                      onChange = {onSearchChange}
                  ></Input>
                </InputGroup>
                </CardBody>
              </Card>
              </Col>
            </Row>
            <Row style ={{justifyContent: "center"}}>
              <Col lg = "6" md = "9">
              <Card style = {{
                minHeight: "300px"
              }}>
                <CardBody>
                <CardTitle style={{
                  color: "grey",
                  fontSize: "25px"
                }}>Destinos</CardTitle>
                </CardBody>
                <ScrollDestinations isFetching = {isFetching}
                  destinations = { citiesIndex !== null && Object.values(citiesIndex).filter(item => item.name.toLowerCase().includes(city.toLowerCase())).sort((a,b) => a.name.localeCompare(b.name))}/>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="pills2">
          <Row style ={{marginTop: "50px", marginLeft: "20px", marginRight: "20px", justifyContent: "center"}}>
            <DestinationsMap
            windowWidth = {windowWidth}
            style = {{justifyContent: "center"}}
            citiesIndex = {objectIsEmpty(citiesIndex) ? {} : citiesIndex}/>
          </Row>
          <Row style = {{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "15px"
              }}>
            <img  alt = "selected place icon" src = {require('assets/icons/pin_green.png')} style = {{
              height: "30px"
            }}></img>
            <div style = {{
              textAlign: "center",
              marginLeft: "10px",
              marginTop: "3px",
              fontSize: "0.9em"
            }}>
              Ciudades con mas de un millon de habitantes
            </div>
          </Row>
          <Row style = {{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "10px"
              }}>
            <img  alt = "my recomendation icon" src = {require("assets/icons/pin_blue.png")} style = {{
              height: "30px"
            }}></img>
            <div style = {{
              textAlign: "center",
              marginLeft: "10px",
              marginTop: "3px",
              fontSize: "0.9em"
            }}>
              Ciudades con habitantes entre 800 y 300 mil
            </div>
          </Row>
          <Row style = {{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px"
              }}>
            <img  alt = "other users recomendations icon" src = {require("assets/icons/pin_orange.png")} style = {{
              height: "30px"
            }}></img>
            <div style = {{
              textAlign: "center",
              marginLeft: "10px",
              marginTop: "3px",
              fontSize: "0.9em"
            }}>
              Ciudades con menos de 300 mil habitantes
            </div>
          </Row>
          </TabPane>
      </TabContent>
  </Container>
  <DefaultFooter/>
  </>
)
}

const mapStateToProps = state => ({
  citiesIndex: state.citiesIndex.data,
  authUser: state.auth,
  isFetching: state.citiesIndex.isFetching,
  savedExperience: state.experiences.message
})

export default connect(mapStateToProps)(withAuth(HomePage))
