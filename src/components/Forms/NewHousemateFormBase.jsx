
import React, {useState, useRef} from "react"
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

//reactstrap components
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  FormFeedback
} from "reactstrap"

//Custom functionality

//Custom components
import HousemateMap from "components/GoogleMaps/HousemateMap"
import Opinion5 from "components/Opinions/Opinion5"
import InputWithIcon from "components/Inputs/InputWithIcon"
import CitiesDropDown from "components/DropDownList/CitiesDropDown"
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'
import ActionModal from 'components/Modals/ActionModal'

const NewExperienceFormBase = ({selectedCity, onChangeCity, citiesIndex, windowDimensions, savingExpState, dispatch, isAuthResolved, auth}) => {

  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`

  const {register, handleSubmit, errors, getValues, reset} = useForm()

  let myRef = useRef(null)

  const [invalidPrice, setInvalidPrice] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [goToDestinations, setGoToDestinations] = useState(false)


  const resetForm = () => {
    setModalMessage("")
    reset()
  }

  //Stop form from submitting in a standard way (problems with the Autocomplete Google Maps function when pressing enter)
  const handleForm = data => {
  }

  if(!goToDestinations){
    return (
      <>
        <Form
        onSubmit = {handleSubmit(handleForm)}
        style = {{
          marginTop: "20px",
          textAlign: "center"
        }}>
          {isFetching && <CenteredLoadingSpinner/>}
          <Container style = {{
            marginTop: "20px",
            textAlign: "center"
          }}>
            <CitiesDropDown label = "En que ciudad quieres compartir piso?" citiesList = {Object.keys(citiesIndex)} onChangeCity = {onChangeCity} />
            <Row style = {{
              justifyContent: "center",
              textAlign: "center"
              }}>
              <Col lg = "6" md = "6">
                <InputWithIcon
                  title = "Con cuantas personas quieres compartir?"
                  name = "peopleSharing"
                  placeHolder = "Total de personas"
                  iconName = "people"
                  register = {register}
                  errors = {errors}
                  getValues = {getValues}
                  disabled = {invalidPrice}/>
              </Col>
              <Col lg = "6" md = "6">
                <InputWithIcon
                  title = "Cual es tu precio de alquiler objetivo?"
                  name = "rent"
                  placeHolder = "Total de personas"
                  iconName = "business_money-coins"
                  register = {register}
                  errors = {errors}
                  getValues = {getValues}
                  disabled = {invalidPrice}/>
              </Col>
            </Row>
            <Row style = {{
              justifyContent: "center",
              textAlign: "center"
              }} >
              <Col lg = "6" md = "6">
                <Opinion5
                  fieldName = "cleanliness"
                  labelName = "Cuanto valoras la limpieza?"
                  icon = "broom"
                  register = {register}
                  errors = {errors}/>
              </Col>
              <Col lg = "6" md = "6">
                <Opinion5
                  fieldName = "weather"
                  labelName = "Cuanto valoras la fiesta?"
                  icon = "emoticons_satisfied"
                  register = {register}
                  errors = {errors}/>
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
            }}
            ref = {myRef}
          >
            <h3 className = "bold"> Donde buscas apartamento? </h3>
            <HousemateMap/>
          </div>
          <Container style = {{
            textAlign: "center"
          }}>
            <Row style = {{marginTop: "0px"}}>
              <FormGroup style = {{padding: "30px"}}>
                <label>
                  <h3 className = "bold">Cuentanos algo sobre ti!</h3>
                  <div className = "blockquote blockquote-primary">
                    <p className = "bold" >Ejemplos</p>
                    <p>Me gusta mucho salir de fiesta pero tambien planes de salir a comer y dar paseos. - Alberto Jaen</p>
                    <p>Me gusta viajar mucho y no soy la persona mas fiestera del mundo. Mi plan favorito es ir a comer al centro de la ciudad y luego tomar un cafe en alguna terraza. - Patricia Arrieta</p>
                  </div>
                </label>
                <Input
                  style = {{
                    fontSize: "large"
                  }}
                  name = "advice"
                  bsSize="lg"
                  id="textArea"
                  rows="5"
                  type="textarea"
                  invalid = {errors.advice !== undefined}
                  innerRef={
                    register({
                      required: true,
                      maxLength: 300
                    })}/>
                  {errors.advice && errors.advice.type === 'required' &&
                  <FormFeedback>Se debe introducir al menos un consejo</FormFeedback>
                  }
                  {errors.advice && errors.advice.type === 'maxLength' &&
                  <FormFeedback>El consejo puede tener como maximo 300 caracteres</FormFeedback>
                  }
              </FormGroup>
             </Row>
          <Button style = {{
            marginBottom: "100px"}}
            disabled = {true}
            size = "lg"
            color = "success"
            type = "submit">
            Enviar
          </Button>
        </Container>
      </Form>
      {modalMessage !== "" && <ActionModal show = {true} title = "" message = {modalMessage} action = {resetForm}/>}
    </>
  )
  }
  else {
    return <Redirect to = "/home" />
  }
}

export default NewExperienceFormBase
