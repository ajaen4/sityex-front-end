import React, {Component, useEffect, useState} from "react";

import { withAuthorization } from '../Session';

import { withFirebase } from '../Firebase';

import WrappedMap from '../GoogleMapsFolder/MapComponent.js';
import Experiences from '../Experiences/Experiences.jsx';

import {prettyCity} from 'components/UsefulFunctions/usefulFunctions';

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
  Col,
  Collapse,
  Card,
  CardBody
} from "reactstrap";

// core components
import NavbarErasmus from "components/Navbars/NavbarErasmus.js";
import DestinationPageHeader from "components/Headers/DestinationPageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

const number12 = [
  {id: "first", value: 0},
  {id: "second", value: 1},
  {id: "third", value: 2},
  {id: "fourth", value: 3},
  {id: "fifth", value: 4},
  {id: "sixth", value: 5},
  {id: "seventh", value: 6},
  {id: "eight", value: 7},
  {id: "ninth", value: 8},
  {id: "tenth", value: 9},
  {id: "eleventh", value: 10},
  {id: "twelth", value:11}
    ];

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;

const DestinationPage = (props) => {

  const [pills, setPills] = useState("1");
  const [cityData, setCityData] = useState(null);

  var location = props.match.params.location;
  props.firebase.doGetCity(prettyCity(location), setCityData);

  //Funcion que se ejecuta despues de cada renderizado
  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");

    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  if(cityData === null) return null;
  else {
    return (

      <>
        <NavbarErasmus />
          <DestinationPageHeader cityName = {location} countryCode = {cityData.countryCode} />
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
                <Characteristics cityData = {cityData} cityName = {location} countryCode = {props.countryCode} />
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

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


class CharacteristicsBase extends Component {

  constructor(props) {
    super(props);

    this.state =
        {
          cityName: props.cityName,
          cityData: props.cityData,
          isOpen: false,
        };

  }

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  render() {

    const {
      cityName,
      cityData,
      isOpen
    } = this.state;

    if(cityData !== null){

      const prices = cityData.prices;
      const weather = cityData.weather;
      const population = cityData.population;

      //Extract prices from document
      const rent = prices["Apartment (1 bedroom) Outside of Centre"];
      const apartmentCost = new Intl.NumberFormat("es-418").format(prices["Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment"]);
      const internetCost = new Intl.NumberFormat("es-418").format(prices["Internet (60 Mbps or More, Unlimited Data, Cable/ADSL)"]);
      const salaryAvg = prices["Average Monthly Net Salary (After Tax)"];
      const mobileFee = new Intl.NumberFormat("es-418").format(prices["1 min. of Prepaid Mobile Tariff Local (No Discounts or Plans)"]);
      const costOfCinema = new Intl.NumberFormat("es-418").format(prices["Cinema, International Release, 1 Seat"]);
      const costOfApples = new Intl.NumberFormat("es-418").format(prices["Apples (1kg)"]);
      const costOfEggs = new Intl.NumberFormat("es-418").format(prices["Eggs (regular) (12)"]);
      const costOfChicken = new Intl.NumberFormat("es-418").format(prices["Chicken Breasts (Boneless, Skinless), (1kg)"]);
      const costOfBeer = new Intl.NumberFormat("es-418").format(prices["Domestic Beer (0.5 liter bottle)"]);
      const costOfMilk = new Intl.NumberFormat("es-418").format(prices["Milk (regular), (1 liter)"]);

      const checkPrices = rent
                        + apartmentCost
                        + internetCost
                        + salaryAvg
                        + mobileFee
                        + costOfCinema
                        + costOfApples
                        + costOfEggs
                        + costOfChicken
                        + costOfBeer
                        + costOfMilk;

      const checkSupermarket = costOfApples
                        + costOfEggs
                        + costOfChicken
                        + costOfBeer
                        + costOfMilk;


      const histAvgTemp = weather.avgTemp;
      let sum = 0;
      for(let temp in weather.avgTemp){
        sum += parseFloat(weather.avgTemp[temp]);
      }
      const histSunset= weather.sunset;

      const yearAvgTemp = (sum / 12).toFixed(2);

      return (
        <Container className = "centerText" style = {{
          fontSize: "17px",
          padding: "0px"
        }}>
          <div className = "rowMainCharact">
          <i className="now-ui-icons users_single-02" style = {{
            marginTop: "3px",
            marginRight: "7px",
          }}></i>
          <div>{cityName} tiene <b>{new Intl.NumberFormat("es-418").format(population)} habitantes</b></div>
          </div>
          {(rent && rent !== "0") && <div className = "rowMainCharact" >
          <i className="now-ui-icons shopping_shop" style = {{
            marginTop: "3px",
            marginRight: "6px"
          }}></i>
          <div>Precio de alquiler medio <b>{new Intl.NumberFormat("es-418").format(rent)} €</b></div>
          </div>}
          {(yearAvgTemp) && <div className = "rowMainCharact">
          <img alt = "temperature icon" src = {require("assets/icons/temperature.png")} style = {{
            marginTop:"2px",
            marginRight: "4px",
            marginLeft: "5px",
            height: "20px"
          }}></img>
          <div>Temperatura media (año) <b>{new Intl.NumberFormat("es-418").format(yearAvgTemp)} ºC</b></div>
          </div>}
          <i className = {"now-ui-icons" + (isOpen ? " arrows-1_minimal-up" : " arrows-1_minimal-down")} onClick={this.toggle} style={{
            margin: '30px'
          }}></i>
          <Collapse isOpen={isOpen} style = {{
            marginLeft: "0px !important"
          }}>
            <Card>
              <CardBody className = "rowDirection rowWrap">
                {checkPrices !== 0 && <Container style = {{
                  width:"49%",
                  minWidth: "330px"
                }}>
                <div className = "rowMainCharact">
                <i className="now-ui-icons business_money-coins" style = {{
                  marginTop: "7px",
                  marginRight: "5px"
                }}></i>
                <h5 className="bold" style = {{
                  marginBottom: "0px"
                }}>Precios</h5>
                </div>
                <div style = {{
                  fontSize: "13px",
                  marginBottom: "15px"
                }}>(Los precios están calculados en euros aunque la moneda local sea distinta)</div>
                <div className = "extraBotMargin">{(apartmentCost && apartmentCost !== "0") && ("Agua, electricidad, tasas de basura: " + apartmentCost + " €")}</div>
                <div className = "extraBotMargin">{(internetCost && internetCost !== "0") && ("Tarifa internet para el apartamento: " + internetCost + " €")}</div>
                <div className = "extraBotMargin">{(salaryAvg && salaryAvg !== "0") && ("Salario medio neto: " + salaryAvg + " €")}</div>
                <div className = "extraBotMargin">{(mobileFee && mobileFee !== "0") && ("Un minuto de tarifa de movil prepago: " + mobileFee + " €")}</div>
                <div className = "extraBotMargin">{(costOfCinema && costOfCinema !== "0") && ("Una entrada de cine: " + costOfCinema + " €")}</div>
                {checkSupermarket !== 0 && <Container>
                <div className = "rowMainCharact" style ={{
                  marginTop:"22px",
                  marginBottom:"10px"
                }}>
                <i className="now-ui-icons shopping_cart-simple" style = {{
                  marginTop: "0px",
                  marginRight: "5px"
                }}></i>
                <h6 className="bold">Bolsa de la compra</h6>
                </div>
                <div className = "extraBotMargin">{(costOfApples && costOfApples !== "0") && ("1 kg de manzanas: " + costOfApples + " €")}</div>
                <div className = "extraBotMargin">{(costOfEggs && costOfEggs !== "0") && ("1 docena de huevos: " + costOfEggs + " €")}</div>
                <div className = "extraBotMargin">{(costOfChicken && costOfChicken !== "0") && ("1 kg de pollo: " + costOfChicken + " €")}</div>
                <div className = "extraBotMargin">{(costOfBeer && costOfBeer !== "0") && ("1/2 L de cerveza local: " + costOfBeer + " €")}</div>
                <div className = "extraBotMargin">{(costOfMilk && costOfMilk !== "0") && ("1/2 L de leche: " + costOfMilk + " €")}</div>
                </Container>
                }
                </Container>
                }
                <Container style = {{
                  width: "49%",
                  minWidth: "330px"
                }}>
                <div className = "rowMainCharact">
                <img alt = "sun icon" src = {require("assets/icons/sun.png")} style = {{
                  marginTop:"5px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  height: "20px"
                }}></img>
                <h5 className="bold" style = {{
                  marginBottom: "0px"
                }} >Tiempo</h5></div>
                <div style = {{
                  fontSize: "13px",
                  marginBottom: "15px"
                }}>(Temperatura media / Salida del sol)</div>
                {
                  number12.map(number =>
                  <div key = {number.id} className = "extraBotMargin rowDirection">
                    <div className = "RightText" style = {{
                      minWidth: "105px"
                    }}><b>{months[number.value]}</b>
                    </div>
                    <img alt = "temperature icon" src = {require("assets/icons/temperature.png")} style = {{
                      marginTop: "2px",
                      marginRight: "1%",
                      marginLeft: "1%",
                      height: "20px"
                    }}></img>
                    <div className = "LeftText" style = {{
                      minWidth: "70px"
                    }}> {histAvgTemp[number.value] + " ºC"}
                    </div>
                    <img alt = "sunset icon" src = {require("assets/icons/sunset.png")} style = {{
                      marginTop:"0px",
                      marginRight: "1%",
                      marginLeft: "1%",
                      height: "20px"
                    }}></img>
                    <div className = "LeftText" style = {{
                      minWidth: "85px"
                    }}> {histSunset[number.value].firstSunset}
                    </div>
                  </div>
                )}
                </Container>
              </CardBody>
            </Card>
          </Collapse>
        </Container>

      );
  } else return null;

  }
}
/*DEPRECATED
function formatNumber(num) {
  if(typeof num !== "undefined" && num !== null){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
}*/

const Characteristics = withFirebase(CharacteristicsBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFirebase(DestinationPage));

/*export default GoogleApiWrapper({
 apiKey: ('AIzaSyCQiTv8a87tF1GArwUKHnhgDBHlcWMEDzc')
}) (withAuthorization(condition)(withFirebase(DestinationPage)));*/
