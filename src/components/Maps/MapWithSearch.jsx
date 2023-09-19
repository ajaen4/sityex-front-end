
import React, { useState, useRef, useEffect } from "react"

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'react-leaflet-fullscreen/styles.css'
import L from 'leaflet'
import { FullscreenControl } from "react-leaflet-fullscreen"
import { SearchBox } from '@mapbox/search-js-react'

import UpdateMapCenter from "components/Maps/UpdateMapCenter"

const TITLESELOPTION = "Incorrect location. "
const WRONGCOUNTRYORCITY = "The location is not in the specified city"
const WRONGLOCATION = "Please select a concrete location"
const LOCATIONALREADYADDED = "You have already added this location"

const greenIcon = L.icon({
  iconUrl: require("assets/icons/pin_green.png"),
  iconSize: [40, 41],
})
const blueIcon = L.icon({
  iconUrl: require("assets/icons/pin_blue.png"),
  iconSize: [40, 41],
})

const EMPTY_PLACE = {
  coordinates: null,
  name: null,
}

const TOKEN = process.env.REACT_APP_MAPS_API_KEY
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE

function MapWithSearch({selectedCity}){

  const [configAlert, setConfigAlert] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState({
    coordinates: null,
    name: null,
  })
  const markerRef = useRef(null)
  const [currRecomendations, setCurrRecomendations] = useState([])

  useEffect(() => {
    if (markerRef.current) {
        const marker = markerRef.current
        marker.on('add', function() {
            this.openPopup()
        })
    }
  }, [selectedPlace])

  const addRecommendation = () => {
    setCurrRecomendations([...currRecomendations, selectedPlace])
    setSelectedPlace(EMPTY_PLACE)
  }

  const isSelectedPlaceInCity = (selectedPlaceCountry, selectedPlaceCity) => {
    if (selectedPlaceCountry  === selectedCity.countryName && selectedPlaceCity === selectedCity.name)
      return true
    else
      return false
  }

  const isAlreadyAdded = placeName => {
    if (currRecomendations.some(recomendation => recomendation.name === placeName))
      return true
    else
      return false
  }

  const handleRetrieve = (res) => {
    const feature = res.features[0]
    
    const coordinates = feature.geometry.coordinates
    let selectedPlaceCity = "" 

    if ("place" in feature.properties.context)
      selectedPlaceCity = feature.properties.context.place.name
    else {
      setConfigAlert({title: TITLESELOPTION, text: WRONGLOCATION, color: "error"})
      return
    }

    const selectedPlaceCountry = feature.properties.context.country.name
    const selectedPlaceName = feature.properties.name
    if (isSelectedPlaceInCity(selectedPlaceCountry, selectedPlaceCity) && isAlreadyAdded(selectedPlaceName))
      setConfigAlert({title: TITLESELOPTION, text: LOCATIONALREADYADDED, color: "error"})
    else if(isSelectedPlaceInCity(selectedPlaceCountry, selectedPlaceCity)){
      setSelectedPlace({
        coordinates: [coordinates[1], coordinates[0]],
        name: selectedPlaceName,
      })
    }
    else {
      setConfigAlert({title: TITLESELOPTION, text: WRONGCOUNTRYORCITY, color: "error"})
      return
    }
  }

  let currentMapCenter = selectedPlace.coordinates ? selectedPlace.coordinates : [selectedCity.latitude, selectedCity.longitude]

  return (
    <>
      <MapContainer center={[selectedCity.latitude, selectedCity.longitude]} zoom={12} style={{height: "400px"}}>
        <UpdateMapCenter center={currentMapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        <FullscreenControl position="topright"/>
        {selectedPlace.coordinates && 
          <Marker
          ref={markerRef}
          key="marker"
          draggable={false}
          position={currentMapCenter}
          icon={greenIcon}
          >
            <Popup
              >
              <Container align="center" style={{height: "100"}}>
                <Typography style={{marginTop: 10, marginBottom: 10, fontWeight: 'bold'}}>{selectedPlace.name}</Typography>
                <Button variant="contained" onClick={addRecommendation}>Add recomendation</Button>
              </Container>
            </Popup>
          </Marker>
        }
        {currRecomendations.map( recomendation =>
          <Marker 
          key={recomendation.name}
          draggable={false}
          position={recomendation.coordinates}
          icon={blueIcon}
          />
        )}
      </MapContainer>
      <SearchBox
        accessToken={TOKEN}
        placeholder="Start typing your address, e.g. 123 Main..."
        options={{language: 'en'}}
        marker={true}
        value=""
        onRetrieve={handleRetrieve}
      />
      <Container sx={{minHeight: "60px", marginTop: "10px"}}>
        {(configAlert) &&
          <Alert
          severity={configAlert.color}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setConfigAlert(null)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          >
            <AlertTitle>{configAlert.title}  {configAlert.text}</AlertTitle>
          </Alert>
        }
      </Container>
    </>
  )
}

export default MapWithSearch
