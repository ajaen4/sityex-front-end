import React, {useEffect} from "react"
import { connect } from 'react-redux'
import Geocode from "react-geocode"

//Custom functionality
import { withAuthorization } from 'session'
import { prettyCity } from 'helpers/usefulFunctions'
import { fetchCitiesIndex, fetchCity, updateMarkers } from 'actions'
import { objectIsEmpty } from 'helpers/usefulFunctions'

//reactstrap components
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap"

//Custom UI components
import NavbarErasmus from "components/Navbars/NavbarErasmus.js"
import DefaultFooter from "components/Footers/DefaultFooter.js"
import WrappedMapWithSearch from 'components/GoogleMaps/MapComponentSearch.js'
import Opinion2 from "components/Opinions/Opinion2.jsx"
import Opinion5 from "components/Opinions/Opinion5.jsx"
import ScrollRecomendations from "components/ScrollList/ScrollRecomendations.jsx"

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`

//NOT USING IT AT THE MOMENT
//Geocode, transforms address into lat and long and the other way around
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
Geocode.enableDebug()

const NewExperiencePage = ({dispatch, selectedCity, citiesIndex}) => {

  const [windowDimensions, setWindowDimensions] = React.useState(window.innerWidth)
  const [currRecomendations, setCurrRecomendations] = React.useState([])

  const initialCity = "Aachen"

  useEffect(() => {
    dispatch(fetchCity(prettyCity(initialCity)))
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

  const incrementRecomendation = (recomendation) => {
    console.log("Recomendation incremented")
    console.log(recomendation)
    if(!currRecomendations.some(recom => recom.name === recomendation.name)){
      var aux = {}
      Object.assign(aux, recomendation)
      var auxRecomendations = []
      Object.assign(auxRecomendations, currRecomendations)
      auxRecomendations.push(aux)
      setCurrRecomendations(auxRecomendations)
    }
  }

  //Callback from map to push recomendation
  const pushRecomendation = place => {
    var aux = {}
    if((place.name != null) && (!currRecomendations.some(recom => (recom.coordinates.lat === place.coordinates.lat) && (recom.coordinates.lng === place.coordinates.lng)))){
      Object.assign(aux, place)
      var auxRecomendations = []
      Object.assign(auxRecomendations, currRecomendations)
      auxRecomendations.push(aux)
      setCurrRecomendations(auxRecomendations)
    }
  }

  //Deletes recomendation when button is pressed
  const deleteRec = (index) => {
    var aux = []
    Object.assign(aux, currRecomendations)
    aux.splice(index, 1)
    setCurrRecomendations(aux)
  }

  //Stop form from submitting in a standar way (problems with the Autocomplete Google Maps function when pressing enter)
  const handleOnSubmit = (event) => {
    event.preventDefault()
    var markerContainer = {
      mapMarkers: currRecomendations
      }
    updateMarkers(selectedCity.name, markerContainer)
  }

  return (

    <>
      <NavbarErasmus color = "blue"/>
        <div style = {{justifyContent: "center", textAlign: "center"}}>
              <h2 className = "bold" style = {{marginTop: "100px"}}> Rellenar experiencia </h2>
              <Form onSubmit = {handleOnSubmit}>
              <Container style = {{
                marginTop: "20px",
                textAlign: "center"
              }}>
                <Row style = {{
                  justifyContent: "center",
                  textAlign: "center"}} >
                  <Col lg = "6">
                    <FormGroup  style ={{
                    justifyContent: "center",
                    textAlign: "center"}} >
                      <label htmlFor="exampleFormControlSelect1">En que ciudad has estado?</label>
                      <Input
                      onChange = {onChangeCity}
                      id="exampleFormControlSelect1"
                      className="form-control-lg"
                      type="select">
                      {citiesIndex !== null && (Object.keys(citiesIndex).sort().map( item =>
                        <option
                        tag="a"
                        href = "#"
                        name = {item}
                        id = {item + "_option"}
                        key = {item} >
                        {prettyCity(item)}
                        </option>
                      ))
                      }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row style = {{
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: "30px"
                  }}>
                  <Col lg = "12">
                  <label htmlFor="exampleFormControlTextarea1">
                    <div className = "blockquote blockquote-primary">
                      <p className = "bold" >Como completar los siguientes pasos</p>
                      <p style = {{margin: "0px"}}>Las opciones son las siguientes:</p>
                      <Row style = {{justifyContent: "center"}}>
                        <Col lg = "3" style = {{alignItems: "center", textAlign: "center"}}>
                          <div>5 = Muy bueno</div>
                          <div>4 = Bueno</div>
                        </Col>
                        <Col lg = "3" style = {{alignItems: "center", textAlign: "center"}}>
                          <div>3 = Sin mas</div>
                        </Col>
                        <Col lg = "3" style = {{alignItems: "center", textAlign: "center"}}>
                          <div>2 = Malo</div>
                          <div>1 = Muy malo</div>
                        </Col>
                      </Row>
                      <p className = "bold" >Ejemplos</p>
                      <Row style = {{justifyContent: "center", padding: "15px", fontSize: "0.9em"}}>
                      <p>La mayor parte del tiempo llovia y anochecia muy pronto. <b>Clima = 1</b></p>
                      <p>Habia 2 o 3 viajes de la ESN increibles, aunque me falto mas cantidad de planes durante el año. <b>Viajes ESN = 4</b></p>
                      <p>Habia muchas discotecas con diferentes tipos de musica. Ademas, se podia salir casi cualquier dia de la semana. <b>Fiesta = 5</b></p>
                      <p>Comer fuera por lo general es caro y tampoco hay una gastronomia propia. <b>Comida = 2</b></p>
                      </Row>
                    </div>
                  </label>
                  </Col>
                </Row>
                <Row style = {{
                  justifyContent: "center",
                  textAlign: "center"
                  }}>
                  <Col lg = "6">
                    <Opinion5 labelName = "Clima" icon = "sun"/>
                  </Col>
                  <Col lg = "6">
                    <Opinion5 labelName = "Comida" icon = "shopping_basket"/>
                  </Col>
                </Row>
                <Row style = {{
                  justifyContent: "center",
                  textAlign: "center"
                  }} >
                  <Col lg = "6">
                    <Opinion5 labelName = "Fiesta" icon = "emoticons_satisfied"/>
                  </Col>
                  <Col lg = "6">
                    <Opinion5 labelName = "Viajes ESN" icon = "transportation_bus-front-12"/>
                  </Col>
                </Row>
                <Row style = {{
                  justifyContent: "center",
                  textAlign: "center"
                  }} >
                  <Col lg = "6">
                    <Opinion2 labelName = "Apartamento o residencia" option1 = "Apartamento" option2 = "Residencia" icon = "shopping_shop"/>
                  </Col>
                  <Col lg = "6" style = {{
                    justifyContent: "center",
                    marginTop: "40px"
                    }}>
                    <h5> En caso de ser residencia, aproximadamente, cuanto costaba el alquiler? </h5>
                    <Row style = {{
                      justifyContent: "center"
                      }}>
                      <FormGroup>
                        <InputGroup>
                          <Input style = {{textAlign: "center"}} placeholder="Alquiler en €" type="text"></Input>
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <i className="now-ui-icons business_money-coins"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <div style = {{
                display: "flex",
                flexDirection: "column",
                marginTop: "50px",
                textAlign: "center",
                marginLeft: "20px",
                marginRight: "20px"
              }}>
                <h3 className = "bold"> Recomiendanos sitios! </h3>
                  <Row style = {{
                    marginTop: "25px",
                    justifyContent: "center"
                  }}>
                    <Col sm = "12" md = "8" lg = "8" style = {{
                      marginBottom: "20px"
                    }}>
                      <div style = {{
                        justifyContent: "center",
                        marginBottom: "60px"
                      }}>
                      { (!objectIsEmpty(selectedCity)) &&
                        <WrappedMapWithSearch
                        incrementRecomendation = {incrementRecomendation}
                        currRecomendations = {currRecomendations}
                        savedRecomendations = {selectedCity.mapMarkers === undefined ? [] : selectedCity.mapMarkers}
                        style = {{justifyContent: "center"}}
                        city = {selectedCity.cityName}
                        coordinates = {{lat:selectedCity.latitude, lng: selectedCity.longitude}}
                        pushRecomendation = {pushRecomendation}
                        googleMapURL = {mapURL}
                        loadingElement = {<p>Cargando</p>}
                        containerElement = {<div style = {{ width: "100%", height : "500px", justifyContent: "center"}}/>}
                        mapElement = {<div style = {{width: "100%", height : "100%", justifyContent: "center"}}/>}/>}
                        </div>
                        <Row style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                            }}>
                          <img  alt = "selected place icon" src = {require("assets/icons/pin_filled_red.png")} style = {{
                            height: "30px"
                          }}></img>
                          <div style = {{
                            textAlign: "center",
                            marginLeft: "5px",
                            marginTop: "3px",
                            fontSize: "0.9em"
                          }}>
                            Ultima busqueda (Pendiente de recomendar)
                          </div>
                        </Row>
                        <Row style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                            }}>
                          <img  alt = "my recomendation icon" src = {require("assets/icons/pin_outline_blue.png")} style = {{
                            height: "30px"
                          }}></img>
                          <div style = {{
                            textAlign: "center",
                            marginLeft: "5px",
                            marginTop: "3px",
                            fontSize: "0.9em"
                          }}>
                            Tus recomendaciones
                          </div>
                        </Row>
                        <Row style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                            }}>
                          <img  alt = "other users recomendations icon" src = {require("assets/icons/pin_filled_blue.png")} style = {{
                            height: "30px"
                          }}></img>
                          <div style = {{
                            textAlign: "center",
                            marginLeft: "5px",
                            marginTop: "3px",
                            fontSize: "0.9em"
                          }}>
                            Recomendaciones de los demas usuarios
                          </div>
                        </Row>
                    </Col>
                    <Col sm = "12" md = "4" lg = "4" >
                      <div>
                        <h5><b>
                          Recomendaciones
                        </b></h5>
                        <ScrollRecomendations currRecomendations = {currRecomendations} windowWidth = {windowDimensions} deleteRec = {deleteRec}/>
                      </div>
                    </Col>
                </Row>
                </div>
                <Container style = {{
                  textAlign: "center"
                }}>
                <Row style = {{marginTop: "0px"}}>
                <FormGroup style = {{padding: "30px"}}>
                  <label htmlFor="exampleFormControlTextarea1">
                    <h3 className = "bold">Danos algún consejo!</h3>
                    <div className = "blockquote blockquote-primary">
                      <p className = "bold" >Ejemplos</p>
                      <p>Para ir a Linkoping hay un aeropuerto muy pequeño en Skavsta, van muy pocos vuelos pero siempre vale
                      la pena comprobar si hay vuelos interesantes!. Si no siempre se puede volar al aeropuerto de Estocolmo - Alberto Jaen</p>
                      <p>En el caso de ir a algun sitio de Europa que no tenga el euro, viene muy bien hacerse la tarjeta
                      de revolut para ahorrar en el cambio de moneda! - Patricia Arrieta</p>
                    </div>
                  </label>
                  <Input
                    bsSize="lg"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    type="textarea"
                  ></Input>
                </FormGroup>
              </Row>
              <Button style = {{
              marginBottom: "100px"}}
              size = "lg"
              color = "success"
              onClick = {handleOnSubmit}>
              Enviar
              </Button>
              </Container>
            </Form>
          </div>
        <DefaultFooter />
    </>
    )
}

const mapStateToProps = state => ({
  citiesIndex: state.citiesIndex.data,
  selectedCity: state.selectedCity.data
})

export default connect(mapStateToProps)(withAuthorization()(NewExperiencePage))
