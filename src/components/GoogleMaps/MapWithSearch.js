
import React, {useState, useEffect} from "react"

import {
  Button,
  Alert} from "reactstrap"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps"

import Autocomplete from 'react-google-autocomplete'

function MapWithSearch({cityCoordinates, currRecomendations, savedRecomendations, pushRecomendation, incrementRecomendation}){

  const iconSelected = { url: require("assets/icons/pin_filled_red.png"), scaledSize: { width: 38, height: 38 } }
  const iconSavedRec = { url: require("assets/icons/pin_filled_blue.png"), scaledSize: { width: 38, height: 38 } }
  const iconCurrRec = { url: require("assets/icons/pin_outline_blue.png"), scaledSize: { width: 38, height: 38 } }

  const TITLESELOPTION = "Localizacion incorrecta. "
  const SELECTOPTION = "Selecciona una de las opciones que aparecen como sugerencias."
  const TITLEOPTSELECTED = "Ya ha recomendado esta localizacion."
  const OPTIONEXISTS = "La localizacion buscada ya ha sido recomendada por otros usuarios. Por favor, seleccionela en el mapa y haga click en 'Recomendar'"
  const TITLEOPTEXISTS = "La localizacion ya existe. "

  const DUMMYRECOM = {coordinates: {lat: 0, lng: 0}, name: "", address: "" }

  var ref = React.createRef()

  const [coordinates, setCoordinates] = useState(cityCoordinates)
  const [selectedRecomen, setSelectedRecomen] = useState(DUMMYRECOM)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [isPlaceSelected, setIsPlaceSelected] = useState(false)
  const [configAlert, setConfigAlert] = useState(null)

  /*const [bounds, setBounds] = useState(new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng({lat: coordinates.lat - 0.1, lng: coordinates.lng - 0.1}),
                new window.google.maps.LatLng({lat: coordinates.lat + 0.1, lng: coordinates.lng + 0.1})))*/

  useEffect(() => setCoordinates(cityCoordinates), [cityCoordinates])

  //Corre cuando se presiona enter o una opcion del autocompletar del google maps
  const onPlaceSelected = (place, ref) => {
    //Comprobacion para obligar a elegir un campo autocompletado y que no exista ya
    if((place.geometry !== undefined) && (!savedRecomendations.some(recom => (recom.coordinates.lat === place.geometry.location.lat()) && (recom.coordinates.lng === place.geometry.location.lng())))){

      console.log("Place selected")
      console.log(place)

      var placesKey = Object.keys(ref.current.autocomplete.gm_bindings_.types)
      var selectedPlace = {}

      debugger
      if(ref.current.autocomplete.gm_bindings_.types[placesKey[0]].re != undefined)
        selectedPlace.name = ref.current.autocomplete.gm_bindings_.types[placesKey[0]].re.formattedPrediction.split(",")[0]
      else
        selectedPlace.name = ref.current.autocomplete.gm_bindings_.types[placesKey[0]].oe.formattedPrediction.split(",")[0]

      selectedPlace.address = place.formatted_address
      selectedPlace.coordinates = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
      selectedPlace.numOfRecomendations = 1

      //Para añadir un marcador en el sitio que se seleccione (no tiene mas consecuencias)
      setSelectedPlace(selectedPlace)
      setIsPlaceSelected(true)
      setCoordinates(selectedPlace.coordinates)
      setConfigAlert(null)
    }
    else if(place.geometry === undefined){
      //Configuramos el texto de la alerta y el color
      setConfigAlert({title: TITLESELOPTION, text: SELECTOPTION, color: "info"})
    }
    else if(currRecomendations.some(recom => (recom.coordinates.lat === place.geometry.location.lat()) && (recom.coordinates.lng === place.geometry.location.lng()))){
      //Configuramos el texto de la alerta y el color
      setConfigAlert({title: TITLEOPTSELECTED, text: "", color: "info"})
    }
    else if(savedRecomendations.some(recom => (recom.coordinates.lat === place.geometry.location.lat()) && (recom.coordinates.lng === place.geometry.location.lng()))){
      //Cogemos la info de la recomendacion guardada
      var existingRecomendation = savedRecomendations.filter(recom => (recom.coordinates.lat === place.geometry.location.lat()) && (recom.coordinates.lng === place.geometry.location.lng()))[0]
      //Para añadir un marcador en el sitio que se seleccione (no tiene mas consecuencias)
      setSelectedRecomen(existingRecomendation)
      setCoordinates(existingRecomendation.coordinates)
      setConfigAlert({title: TITLEOPTEXISTS, text: OPTIONEXISTS, color: "info"})
    }
  }

  const addRecommendation = (place) => {
    pushRecomendation(place)
  }

  const increaseRecomendation = (recomendation) => {
    incrementRecomendation(recomendation)
  }

  return (
    <>
      <GoogleMap
      defaultZoom = {12}
      center = {coordinates}>
      {
        //Marcadores de las recomendaciones guardadas por otros usuarios
        savedRecomendations.map(recomendation =>
        <Marker
          key = {recomendation.name}
          name = {recomendation.name}
          draggable = {false}
          position = {recomendation.coordinates}
          icon = {iconSavedRec}
          onClick = {() => {setSelectedRecomen(recomendation)}}
        >
        {
          //Solo enseñar en caso de que la recomendacion elegida sea la actual
          ((recomendation.coordinates.lat === selectedRecomen.coordinates.lat) && (recomendation.coordinates.lng === selectedRecomen.coordinates.lng)) &&
          <InfoWindow
            onCloseClick={() => {
              setSelectedRecomen(DUMMYRECOM)
            }}
            position={selectedRecomen.coordinates}>
            <div style = {{padding: "5px"}}>
              {(!currRecomendations.some(currRec => (currRec.coordinates.lat === selectedRecomen.coordinates.lat) && (currRec.coordinates.lng === selectedRecomen.coordinates.lng))) &&
                <Button color = "success" onClick = {() => {increaseRecomendation(selectedRecomen)}}>Recomendar</Button>}
              <div><b>Nombre: </b> {selectedRecomen.name}</div>
              <div><b># de recomendaciones: </b>{selectedRecomen.numOfRecomendations}</div>
              <div><b>Direccion: </b> {selectedRecomen.address}</div>
            </div>
          </InfoWindow>
          }
        </Marker>
      )}
      {
        //Marcadores de las recomendaciones guardadas por el usuario actual
        currRecomendations.filter(currRec => !savedRecomendations.some(savedRec => (savedRec.coordinates.lat === currRec.coordinates.lat) && (savedRec.coordinates.lng === currRec.coordinates.lng))).map(recomendation =>
        <Marker
          key = {recomendation.name}
          name = {recomendation.name}
          draggable = {false}
          position = {recomendation.coordinates}
          icon={iconCurrRec}
          onClick={() => {setSelectedRecomen(recomendation)}}
        >
        {
          //Solo enseñar en caso de que la recomendacion elegida sea la actual
          ((recomendation.coordinates.lat === selectedRecomen.coordinates.lat) && (recomendation.coordinates.lng === selectedRecomen.coordinates.lng)) &&
          <InfoWindow
            onCloseClick={() => {
              setSelectedRecomen(DUMMYRECOM)
            }}
            position={selectedRecomen.coordinates}>
            <div style = {{padding: "5px"}}>
              {(!currRecomendations.some(currRec => (currRec.coordinates.lat === selectedRecomen.coordinates.lat) && (currRec.coordinates.lng === selectedRecomen.coordinates.lng))) &&
                <Button color = "success" onClick = {() => {incrementRecomendation(selectedRecomen)}}>Recomendar</Button>}
              <div><b>Nombre: </b> {selectedRecomen.name}</div>
              <div><b># de recomendaciones: </b>{selectedRecomen.numOfRecomendations}</div>
              <div><b>Direccion: </b> {selectedRecomen.address}</div>
            </div>
          </InfoWindow>
        }
        </Marker>
      )}
      {
        //Aislamos el marcador de sitio seleccionado sin recomendar todavia
        (selectedPlace) &&
        <Marker
          key = {selectedPlace.name}
          name = {selectedPlace.name}
          draggable = {false}
          position = {selectedPlace.coordinates}
          icon={iconSelected}
          onClick={() => {setIsPlaceSelected(true)}}
        >
        {(isPlaceSelected) &&
          <InfoWindow style = {{padding: "5px"}}
            onCloseClick={() => {setIsPlaceSelected(false)}}
            position={selectedPlace.coordinates}>
            <div>
            {(!currRecomendations.some(recom => recom.name === selectedPlace.name)) &&
              <Button color = "success" onClick = {() => {addRecommendation(selectedPlace)}}>Recomendar</Button>}
              <div><b>Nombre: </b> {selectedPlace.name}</div>
              <div><b># de recomendaciones: </b>{selectedPlace.numOfRecomendations}</div>
              <div><b>Direccion: </b> {selectedPlace.address}</div>
            </div>
          </InfoWindow>
        }
        </Marker>
      }
      </GoogleMap>
      <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '2px'
       }}
       ref = {ref}
       onPlaceSelected = { (event) => {onPlaceSelected(event, ref)} }
       types = {['establishment']}
       />
       {(configAlert) && <Alert color= {configAlert.color} isOpen={true} style = {{padding: "20px"}}>
          <div className="container">
              <img  alt = "warning" src = {require("assets/icons/warning.png")} style = {{
                height: "30px",
                marginRight: "50px"
              }}></img>
            <strong>{configAlert.title}</strong>{configAlert.text}
            <button
              type = "button"
              className = "close"
              aria-label = "Close"
              onClick = {() => {setConfigAlert(null)}}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </Alert>
      }
    </>
  )
}

const WrappedMapWithSearch = withScriptjs(withGoogleMap(MapWithSearch))

export default WrappedMapWithSearch
