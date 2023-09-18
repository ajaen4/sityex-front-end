
import React from "react"
import { Link } from 'react-router-dom'
import { Container, Button } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'react-leaflet-fullscreen/styles.css'
import { FullscreenControl } from "react-leaflet-fullscreen"
import L from "leaflet"


const POPULATIONBIG = 1000000
const POPULATIONSMALL = 300000

const CENTER = {lat: 46.37783368972618, lng: 4.62754074832646}

const TOKEN = process.env.REACT_APP_MAPS_API_KEY
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE

const greenIcon = L.icon({
  iconUrl: require("assets/icons/pin_green.png"),
  iconSize: [40, 41],
})
const blueIcon = L.icon({
  iconUrl: require("assets/icons/pin_blue.png"),
  iconSize: [40, 41],
})
const orangeIcon = L.icon({
  iconUrl: require("assets/icons/pin_orange.png"),
  iconSize: [40, 41],
})

function DestinationsMap({citiesIndex}){

  const citiesIndexValues = Object.values(citiesIndex)

  return (
      <MapContainer center={[CENTER["lat"], CENTER["lng"]]} zoom={4} style={{height: "400px"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        {citiesIndexValues.map( city =>
          <Marker 
          key={city.name}
          draggable={false}
          position={[city.latitude, city.longitude]}
          icon = {city.population >= POPULATIONBIG ? greenIcon : city.population >= POPULATIONSMALL ? blueIcon : orangeIcon}

          >
            <Popup>
              <Container align="center">
                <div style={{marginBottom: "5px"}}><b>{city.name.toUpperCase()}</b></div>
                <div style={{marginBottom: "5px"}}>{new Intl.NumberFormat("es-418").format(city.population) + " habitantes"}</div>
                <Link to = {"/destination/" + city.name} style={{marginBottom: "5px"}}>
                  <Button variant="contained">Mas informacion</Button>
                </Link>
              </Container>
            </Popup>
          </Marker>
        )}
        <FullscreenControl position="topright"/>
      </MapContainer>
  )
}

export default DestinationsMap
