import React, {useEffect, useState} from "react";

import { withAuthorization } from 'session';

import { withFirebase } from 'apis/Firebase';

import {prettyCity} from 'helpers/usefulFunctions';

// reactstrap components
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
} from "reactstrap";

// core components
import NavbarErasmus from "components/Navbars/NavbarErasmus.js";
import DestinationPageHeader from "components/Headers/DestinationPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import WrappedMap from 'components/GoogleMaps/MapComponent.js';
import Experiences from 'components/Experiences/Experiences.jsx';
import CityInfo from 'components/Pages/DestinationPage/CityInfo.jsx';

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;

const DestinationPage = (props) => {

  const [pills, setPills] = useState("1");
  const [cityData, setCityData] = useState(null);

  useEffect(() => props.firebase.doGetCity(prettyCity(props.match.params.location), setCityData), [props]);

  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  if(cityData === null) return null;
  else {

    const location = props.match.params.location;

    return (

      <>
        <NavbarErasmus color = "transparent"/>
          <DestinationPageHeader cityName = {location} countryName = {cityData.countryName} />
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
                <CityInfo cityData = {cityData} cityName = {location} countryCode = {props.countryCode} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="title text-center">Áreas</h3>
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
                            e.preventDefault();
                            setPills("1");
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
                            e.preventDefault();
                            setPills("2");
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
                            e.preventDefault();
                            setPills("3");
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
                  <Col sm = "11" md = "12" lg = "11" >
                    <Experiences/>
                  </Col>
                </Row>
                </TabPane>
                <TabPane tabId="pills2">
                <Row style = {{justifyContent: "center"}}>
                  <Col sm = "11" md = "12" lg = "11" >
                    <Experiences/>
                  </Col>
                </Row>
                </TabPane>
                <TabPane tabId="pills3">
                <Row style = {{justifyContent: "center"}}>
                  <Col sm = "12" md = "12" lg = "12">
                    <div style = {{
                      justifyContent: "center"
                      }}>
                      <WrappedMap
                      style = {{justifyContent: "center"}}
                      coordinates = {{lat: cityData.latitude, lng: cityData.longitude }}
                      recomendations = {cityData.mapMarkers === undefined ? [] : cityData.mapMarkers}
                      googleMapURL = {mapURL}
                      loadingElement = {<p>Cargando</p>}
                      containerElement = {<div style = {{ width: "100%", height : "500px", justifyContent: "center"}}/>}
                      mapElement = {<div style = {{width: "100%", height : "100%", justifyContent: "center"}}/>}/>
                    </div>
                  </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Container>
          </div>
          <DefaultFooter />
      </>
      );
    }
}

export default withAuthorization()(withFirebase(DestinationPage));
