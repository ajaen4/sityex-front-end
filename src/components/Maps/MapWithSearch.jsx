
import React, { useState } from "react"

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'react-leaflet-fullscreen/styles.css'
import { FullscreenControl } from "react-leaflet-fullscreen"
import UpdateMapCenter from "components/Maps/UpdateMapCenter"

const TITLESELOPTION = "Localizacion incorrecta. "
const WRONGCOUNTRYORCITY = "La localizacion no esta en la ciudad seleccionada"
const SELECTOPTION = "Selecciona una de las opciones que aparecen como sugerencias."
const TITLEOPTSELECTED = "Ya ha recomendado esta localizacion."
const OPTIONEXISTS = "La localizacion buscada ya ha sido recomendada por otros usuarios. Por favor, seleccionela en el mapa y haga click en 'Recomendar'"
const TITLEOPTEXISTS = "La localizacion ya existe. "

const TOKEN = process.env.REACT_APP_MAPS_API_KEY
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE

function MapWithSearch({selectedCity}){

  const [configAlert, setConfigAlert] = useState(null)

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

  return (
    <>
      <MapContainer center={[selectedCity.latitude, selectedCity.longitude]} zoom={12} style={{height: "400px"}}>
        <UpdateMapCenter center={[selectedCity.latitude, selectedCity.longitude]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        <FullscreenControl position="topright"/>
      </MapContainer>
      {(configAlert) &&
        <Alert severity={configAlert.color} style={{ padding: "20px" }}>
          <AlertTitle>{configAlert.title}</AlertTitle>
          {configAlert.text}
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => setConfigAlert(null)}
          >
            <span aria-hidden="true">
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </span>
          </button>
        </Alert>
      }
    </>
  )
}

export default React.memo(MapWithSearch)
