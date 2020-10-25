
import React, {useState, useRef} from "react"
import { useForm } from 'react-hook-form'

//reactstrap components
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  FormFeedback,
  Alert
} from "reactstrap"

//Custom functionality
import { addExperience } from 'actions'

//Custom components
import Opinion2 from "components/Opinions/Opinion2"
import Opinion5 from "components/Opinions/Opinion5"
import InputWithIcon from "components/Inputs/InputWithIcon"
import NewExpControl from "components/FormControl/NewExpControl"
import CitiesDropDown from "components/DropDownList/CitiesDropDown"
import RecomenMapWithList from "components/GoogleMaps/RecomenMapWithList"
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'
import ActionModal from 'components/Modals/ActionModal'

const NewExperienceFormBase = ({selectedCity, onChangeCity, citiesIndex, windowDimensions, savingExpState, dispatch}) => {

  const {register, handleSubmit, errors, getValues, setValue, reset} = useForm()

  let myRef = useRef(null)

  const [invalidPrice, setInvalidPrice] = useState(false)
  const [noRecomendations, setNoRecomendations] = useState(false)
  const [currRecomendations, setCurrRecomendations] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const updateRecomendations = recomendations => {
    setCurrRecomendations(recomendations)
  }

  const resetForm = () => {
    setModalMessage("")
    reset()
  }

  //Stop form from submitting in a standar way (problems with the Autocomplete Google Maps function when pressing enter)
  const handleForm = data => {
    if(currRecomendations.length === 0){
      window.scrollTo(0, myRef.current.offsetTop)
      setNoRecomendations(true)
    }
    else {
      setIsFetching(true)
      dispatch(addExperience(selectedCity.name, data, currRecomendations))
      .then(() => {
        setIsFetching(false)
        setModalMessage("Su experiencia se ha guardado correctamente")
      })
      .catch(err => {
        setIsFetching(false)
        setModalMessage("Ha ocurrido un problema. Por favor, vuelva a intentarlo")
      })
    }
  }

  const onChangeHousing = event => {
    if(event.target.value === 'option1'){
      setInvalidPrice(true)
      setValue('residencePrice', 0)
    }
    else{
      setInvalidPrice(false)
      setValue('residencePrice', "")
    }
  }

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
          <CitiesDropDown citiesList = {Object.keys(citiesIndex)} onChangeCity = {onChangeCity} />
          <NewExpControl/>
          <Row style = {{
            justifyContent: "center",
            textAlign: "center"
            }}>
            <Col lg = "6">
              <Opinion5
                labelName = "Clima"
                icon = "sun"
                register = {register}
                errors = {errors}/>
            </Col>
            <Col lg = "6">
              <Opinion5
                labelName = "Comida"
                icon = "shopping_basket"
                register = {register}
                errors = {errors}/>
            </Col>
          </Row>
          <Row style = {{
            justifyContent: "center",
            textAlign: "center"
            }} >
            <Col lg = "6">
              <Opinion5
                labelName = "Fiesta"
                icon = "emoticons_satisfied"
                register = {register}
                errors = {errors}/>
            </Col>
            <Col lg = "6">
              <Opinion5
                labelName = "Viajes ESN"
                icon = "transportation_bus-front-12"
                register = {register}
                errors = {errors}/>
            </Col>
          </Row>
          <Row style = {{
            justifyContent: "center",
            textAlign: "center"
            }} >
            <Col lg = "6">
              <Opinion2
                labelName = "Apartamento o residencia"
                option1 = "Apartamento"
                option2 = "Residencia"
                icon = "shopping_shop"
                register = {register}
                errors = {errors}
                onChange = {onChangeHousing}/>
            </Col>
            <Col lg = "6">
              <InputWithIcon
                title = "En caso de ser residencia, aproximadamente, cuanto costaba el alquiler?"
                name = "residencePrice"
                placeHolder = "Alquiler en €"
                iconName = "business_money-coins"
                register = {register}
                errors = {errors}
                getValues = {getValues}
                disabled = {invalidPrice}/>
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
          <h3 className = "bold"> Recomiendanos sitios! </h3>
          <RecomenMapWithList
            selectedCity = {selectedCity}
            windowDimensions = {windowDimensions}
            updateRecomendations = {updateRecomendations}/>
         </div>
         {noRecomendations && <Alert color = "danger" isOpen = {true} style = {{padding: "20px"}}>
            <div className="container">
                <img  alt = "warning" src = {require("assets/icons/warning.png")} style = {{
                  height: "30px",
                  marginRight: "50px"
                }}></img>
              <strong>Por favor, elige al menos una recomendacion</strong>
              <button
                type = "button"
                className = "close"
                aria-label = "Close"
                onClick = {() => {setNoRecomendations(false)}}
              >
                <span aria-hidden="true">
                  <i className="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </Alert>
        }
        <Container style = {{
          textAlign: "center"
        }}>
          <Row style = {{marginTop: "0px"}}>
            <FormGroup style = {{padding: "30px"}}>
              <label>
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
                style = {{
                  fontSize: "large"
                }}
                name = "advice"
                bsSize="lg"
                id="textArea"
                rows="3"
                type="textarea"
                invalid = {errors.advice !== undefined}
                innerRef={
                  register({
                    required: true
                  })}/>
                {errors.advice && errors.advice.type === 'required' &&
                <FormFeedback>Se debe introducir al menos un consejo</FormFeedback>
                }
            </FormGroup>
           </Row>
        <Button style = {{
          marginBottom: "100px"}}
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

export default NewExperienceFormBase
