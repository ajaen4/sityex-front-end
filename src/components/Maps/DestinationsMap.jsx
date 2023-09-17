
import React from "react"
import { Link } from 'react-router-dom'
import { Container, Button } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'react-leaflet-fullscreen/styles.css'
import { FullscreenControl } from "react-leaflet-fullscreen"

import pinOrange from "assets/icons/pin_orange.png"
import pinBlue from "assets/icons/pin_blue.png"
import pinGreen from "assets/icons/pin_green.png"


const CENTER = {lat: 46.37783368972618, lng: 4.62754074832646}
const POPULATIONBIG = 1000000
const POPULATIONSMALL = 300000

const ICONSMALLTOWN = { url: pinOrange, scaledSize: { width: 30, height: 30 } }
const ICONMEDCITY = { url: pinBlue, scaledSize: { width: 30, height: 30 } }
const ICONBIGCITY = { url: pinGreen, scaledSize: { width: 30, height: 30 } }

const TOKEN = process.env.REACT_APP_MAPS_API_KEY
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE

function DestinationsMap({citiesIndex, windowWidth}){

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
