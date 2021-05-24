
import React, {useState, useRef} from "react"
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

//reactstrap components
import {
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Button
} from "reactstrap"

//Custom functionality
import { addHousemate } from 'actions'

//Custom components
//import DropCircleRadius from "components/DropDownList/DropCircleRadius"
//import HousemateMap from "components/GoogleMaps/HousemateMap"
import Opinion5 from "components/Opinions/Opinion5"
import InputWithIcon from "components/Inputs/InputWithIcon"
import CitiesDropDown from "components/DropDownList/CitiesDropDown"
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'
import ActionModal from 'components/Modals/ActionModal'
import DateRange from "components/Inputs/DateRange"
import TextArea from "components/TextArea/TextArea"

//const DEFAULT_CENTER = {lat: 50.77603, lng: 6.08723}

const HouseMateFormBase = ({selectedCity, onChangeCity, citiesIndex, savingExpState, dispatch, isAuthResolved, auth}) => {

  const {register, handleSubmit, errors, getValues, reset} = useForm()

  let dateContainer = useRef(null)
  const history = useHistory()

  //const circleLocation = useRef({lat: 0, lng: 0})

  //const [circleRadius, setCircleRadius] = useState("1 km")
  const [isFetching, setIsFetching] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [dateRange, setDateRange] = useState({startDate: null, endDate: null})
  const [errorDateRange, setErrorDateRange] = useState(false)

  const goToDestinations = () => history.push(`/home`)

  const resetForm = () => {
    setModalMessage("")
    reset()
  }

  /*useEffect(() => {
    if(selectedCity !== null){
      circleLocation.current = {lat: selectedCity.latitude, lng: selectedCity.longitude}
    }
  }, [selectedCity])*/

  const onChangeDates = (startDate, endDate) => setDateRange({startDate: startDate, endDate: endDate})

  /*const onDragCircle = (location) => {
    circleLocation.current = location
  }*/

  //Stop form from submitting in a standard way (problems with the Autocomplete Google Maps function when pressing enter)
  const handleForm = data => {
    if((dateRange.startDate === null) || (dateRange.endDate === null)){
      setErrorDateRange(true)
      window.scrollTo(0, dateContainer.current.offsetTop)
    }
    else {
      data.userName = auth.userName
      //data.circleLocation = circleLocation.current
      //data.circleRadius = circleRadius
      data.startDate = dateRange.startDate.toDate()
      data.endDate = dateRange.endDate.toDate()
      data.userId = auth.id
      setIsFetching(true)
      dispatch(addHousemate(selectedCity.name, data))
      .then(() => {
        setIsFetching(false)
        setModalMessage("Su peticion se ha guardado correctamente")
        setTimeout(() => {
          goToDestinations()
        }, 2500);
      })
      .catch(err => {
        setIsFetching(false)
        setModalMessage("Ha ocurrido un problema. Por favor, vuelva a intentarlo")
      })
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
                  disabled = {false}/>
              </Col>
              <Col lg = "6" md = "6">
                <InputWithIcon
                  title = "Cual es tu precio de alquiler objetivo?"
                  name = "rent"
                  placeHolder = "Precio"
                  iconName = "business_money-coins"
                  register = {register}
                  errors = {errors}
                  getValues = {getValues}
                  disabled = {false}/>
              </Col>
            </Row>
            <Row style = {{
              justifyContent: "center",
              textAlign: "center"
              }} >
              <Col lg = "6" md = "6">
                <Opinion5
                  fieldName = "cleanliness"
                  errorName = "limpieza"
                  labelName = "Cuanto valoras la limpieza?"
                  icon = "broom"
                  register = {register}
                  errors = {errors}/>
              </Col>
              <Col lg = "6" md = "6">
                <Opinion5
                  fieldName = "party"
                  errorName = "fiesta"
                  labelName = "Cuanto valoras la fiesta?"
                  icon = "emoticons_satisfied"
                  register = {register}
                  errors = {errors}/>
              </Col>
            </Row>
            <div ref = {dateContainer}>
              <Row style = {{
                justifyContent: "center",
                textAlign: "center"
                }}>
                <Col lg = "4" md = "6" style = {{marginTop: "40px"}}>
                  <DateRange
                    label = "Tiempo de estancia:"
                    onChangeDates = {onChangeDates}
                    />
                    {errorDateRange && <p style = {{color: "red", fontSize: "1em"}}>Se debe rellenar el rango de fechas de estancia</p>}
                </Col>
              </Row>
            </div>
          </Container>
          {/*<div style = {{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
            textAlign: "center",
            marginLeft: "20px",
            marginRight: "20px"
            }}
          >
            <h3 className = "bold"> Donde buscas apartamento? </h3>
            <Row style = {{justifyContent: "center"}}>
              <Col lg = "2" md = "3" sm = "6" xs = "6">
                <DropCircleRadius
                  onChange = {setCircleRadius}/>
              </Col>
            </Row>
            <HousemateMap
              center = {selectedCity !== null ? {lat: selectedCity.latitude, lng: selectedCity.longitude} : DEFAULT_CENTER }
              circleRadiusProp = {circleRadius}
              onDragCircle = {onDragCircle}/>
          </div>*/}
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
                <TextArea
                  name = "comment"
                  displayName = "comentario"
                  register = {register}
                  errors = {errors}/>
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

export default HouseMateFormBase
