
import React, {useState, useEffect} from "react"

import {
  Button,
  Alert} from "reactstrap"

import {
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete} from '@react-google-maps/api'

//import Autocomplete from 'react-google-autocomplete'

const TITLESELOPTION = "Localizacion incorrecta. "
const WRONGCOUNTRYORCITY = "La localizacion no esta en la ciudad seleccionada"
const SELECTOPTION = "Selecciona una de las opciones que aparecen como sugerencias."
const TITLEOPTSELECTED = "Ya ha recomendado esta localizacion."
const OPTIONEXISTS = "La localizacion buscada ya ha sido recomendada por otros usuarios. Por favor, seleccionela en el mapa y haga click en 'Recomendar'"
const TITLEOPTEXISTS = "La localizacion ya existe. "

const DUMMYRECOM = {coordinates: {lat: 0, lng: 0}, name: "", address: "" }

const ICONSELECTED = { url: require("assets/icons/pin_red.png"), scaledSize: { width: 38, height: 38 } }
const ICONSAVEDREC = { url: require("assets/icons/pin_blue.png"), scaledSize: { width: 38, height: 38 } }
const ICONCURRREC = { url: require("assets/icons/pin_outline_blue.png"), scaledSize: { width: 38, height: 38 } }


function MapWithSearch({selectedCity, currRecomendations, savedRecomendations, pushRecomendation, incrementRecomendation}){

  const [coordinates, setCoordinates] = useState({lat: selectedCity.latitude, lng: selectedCity.longitude})
  const [selectedRecomen, setSelectedRecomen] = useState(DUMMYRECOM)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [isPlaceSelected, setIsPlaceSelected] = useState(false)
  const [configAlert, setConfigAlert] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null)


  useEffect(() => setCoordinates({lat: selectedCity.latitude, lng: selectedCity.longitude}), [selectedCity])

  const checkCityAndCountry = (selectedCity, selectedPlace) => {
    let sameCity = false
    let sameCountry = false

    const address = selectedPlace.address_components

    for(const index in address){
      if(address[index].types.includes("locality") && (address[index].long_name === selectedCity.name)){
        sameCity = true
      }

      if(address[index].types.includes("country") && (address[index].long_name === selectedCity.countryName)){
        sameCountry = true
      }
    }
    return sameCity && sameCountry
  }

  //Corre cuando se presiona enter o una opcion del autocompletar del google maps
  const onPlaceSelected = () => {
    const place = autocomplete.getPlace()
    //Si se ha instanciado el autocomplete
    if(autocomplete !== null){

      if(!checkCityAndCountry(selectedCity, place)){
        setConfigAlert({title: TITLESELOPTION, text: WRONGCOUNTRYORCITY, color: "danger"})
      }
      //Comprobacion para obligar a elegir un campo autocompletado y que no exista ya
      else if((place.geometry !== undefined) && (!savedRecomendations.some(recom => recom.id === place.place_id))){

        console.log("Place selected")
        console.log(place)
        var selectedPlace = {}

        selectedPlace.name = place.address_components[0].long_name
        selectedPlace.address = place.formatted_address
        selectedPlace.coordinates = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
        selectedPlace.numOfRecomendations = 1
        selectedPlace.id = place.place_id

        //Para añadir un marcador en el sitio que se seleccione (no tiene mas consecuencias)
        setSelectedPlace(selectedPlace)
        setIsPlaceSelected(true)
        setCoordinates(selectedPlace.coordinates)
        setConfigAlert(null)
      }
      //Localizacion incorrecta
      else if(place.geometry === undefined){
        //Configuramos el texto de la alerta y el color
        setConfigAlert({title: TITLESELOPTION, text: SELECTOPTION, color: "info"})
      }
      //Cuando el usuario ya ha recomendado esa opcion
      else if(currRecomendations.some(recom => recom.id === place.place_id)){
        //Configuramos el texto de la alerta y el color
        setConfigAlert({title: TITLEOPTSELECTED, text: "", color: "info"})
      }
      //Cuando otro usuario ha recomendado esa opcion
      else if(savedRecomendations.some(recom => (recom.id === place.place_id))){
        //Cogemos la info de la recomendacion guardada
        var existingRecomendation = savedRecomendations.filter(recom => recom.id === place.place_id)[0]
        //Para añadir un marcador en el sitio que se seleccione (no tiene mas consecuencias)
        setSelectedRecomen(existingRecomendation)
        setCoordinates(existingRecomendation.coordinates)
        setConfigAlert({title: TITLEOPTEXISTS, text: OPTIONEXISTS, color: "info"})
      }
    }
  }

  const addRecommendation = (place) => {
    pushRecomendation(place)
  }

  const increaseRecomendation = (recomendation) => {
    incrementRecomendation(recomendation)
  }

  const onLoad = (autocomplete) => setAutocomplete(autocomplete)

  return (
    <>
        <GoogleMap
          style = {{width: "100%", height : "100%", justifyContent: "center"}}
          mapContainerStyle = {{ width: "100%", height : "500px", justifyContent: "center"}}
          zoom = {12}
          center = {coordinates}>
          {
            //Marcadores de las recomendaciones guardadas por otros usuarios
            savedRecomendations.map(recomendation =>
            <Marker
              key = {recomendation.name}
              name = {recomendation.name}
              draggable = {false}
              position = {recomendation.coordinates}
              icon = {ICONSAVEDREC}
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
              icon={ICONCURRREC}
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
              icon={ICONSELECTED}
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
            onLoad={onLoad}
            onPlaceChanged={onPlaceSelected}
          >
            <input
              type="text"
              placeholder="Introduce una ubicacion"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `100%`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "relative"
              }}
            />
          </Autocomplete>
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

export default React.memo(MapWithSearch)
