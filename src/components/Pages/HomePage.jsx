import React, {useState, useEffect} from 'react';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

// reactstrap components
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
  Row,
} from "reactstrap";

import WhiteBackGroundNav from "components/Navbars/WhiteBackgroundNav.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import ScrollDestinations from "components/ScrollList/ScrollDestinations.jsx";
import WrappedMapDestinations from '../GoogleMapsFolder/MapComponentDestinations.js';

import * as CITIES from '../../constants/citiesEU';

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
const cityData = {latitude: 50.77603, longitude: 6.08723};

const HomePage = (props) => {

  //State
  const [pills, setPills] = useState("1");
  const [location, setLocation] = useState('');
  const [authUser, setAuthUser] = useState(props.authUser);
  const [citiesIndex, setCitiesIndex] = useState(null);

  var citiesList = Object.values(CITIES)[0];

  useEffect(() => {

    props.firebase.doGetCitiesIndex(setCitiesIndex);

  }, []);

  useEffect(() => {

    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };

  });

  const onSearchChange = event => {
      setLocation(event.target.value);
    };

  return (
    <>
      <WhiteBackGroundNav />
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
                  e.preventDefault();
                  setPills("1");
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
                  e.preventDefault();
                  setPills("2");
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
                      value = {location}
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
                <ScrollDestinations destinations = {citiesList.sort().filter(item => item.toLowerCase().includes(location.toLowerCase()))}/>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="pills2">
          <Row style ={{marginTop: "50px", justifyContent: "center"}}>
            <WrappedMapDestinations
            style = {{justifyContent: "center"}}
            citiesIndex = {citiesIndex === null ? {} : citiesIndex}
            googleMapURL = {mapURL}
            loadingElement = {<p>Cargando</p>}
            containerElement = {<div style = {{ width: "100%", height : "600px", justifyContent: "center"}}/>}
            mapElement = {<div style = {{width: "100%", height : "100%", justifyContent: "center"}}/>}/>
          </Row>
          <Row style = {{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "15px"
              }}>
            <img  alt = "selected place icon" src = {require("assets/icons/cityscape.png")} style = {{
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
            <img  alt = "my recomendation icon" src = {require("assets/icons/city.png")} style = {{
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
              marginTop: "10px"
              }}>
            <img  alt = "other users recomendations icon" src = {require("assets/icons/small_town.png")} style = {{
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
    );

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(HomePage));
