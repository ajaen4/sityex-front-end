
import React, { useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'

//Custom functionality
import { sameAs } from "helpers/validators.js"
import { objectIsEmpty } from 'helpers/usefulFunctions'
import { createUser } from 'actions'
import * as ROUTES from 'constants/routes'

//reactstrap components
import{
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormFeedback
} from "reactstrap"

//Custom components
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import { DismissAlert } from 'components/Alerts/'

const NewExperienceForm = ({}) => {

  const {register, handleSubmit, errors, getValues} = useForm()

  const [isFetching, setIsFetching] = useState(false)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleForm = data => {
    setIsFetching(true)
    createUser(data)
    .then(user => {
      setUser(user)
      setIsFetching(false)
    }, errorMessage => {
      setErrorMessage(errorMessage)
      setIsFetching(false)
    })
  }

  useEffect(() => {
    if(!objectIsEmpty(user))
      setTimeout(() => history.push(ROUTES.HOME), 3000)
  }, [user, history])

  if(isFetching)
    return <LoadingSpinner/>

  if(user){
    return <DismissAlert
            color = "success"
            message = {"El usuario con email " + user.email +  " se ha creado correctamente"}
            />
  }

  return (
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
  )
}

export default NewExperienceForm
