
import React from "react"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'react-leaflet-fullscreen/styles.css'
import { FullscreenControl } from "react-leaflet-fullscreen"

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const TOKEN = process.env.REACT_APP_MAPS_API_KEY
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE

function RecommendationsMap({selectedCity}){

  return (
    <MapContainer center={[selectedCity.latitude, selectedCity.longitude]} zoom={13} style={{height: "400px", width: "100%"}}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
      />
      <FullscreenControl position="topright"/>
      {selectedCity.recomendations?.map(recomendation => 
        <Marker
        key={recomendation.name}
        draggable={false}
        position={[recomendation.coordinates.latitude, recomendation.coordinates.longitude]}
        >
          <Popup>
            <Container align="center" style={{height: "100"}}>
              <Typography style={{marginTop: 10, marginBottom: 10, fontWeight: 'bold'}}>{recomendation.name}</Typography>
              <Typography style={{marginTop: 5, marginBottom: 5}}>Type: {recomendation.categories[0]}</Typography>
              <Typography style={{marginTop: 5, marginBottom: 5}}>Num of recomendations: {recomendation.numOfRecomendations}</Typography>
            </Container>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default RecommendationsMap
