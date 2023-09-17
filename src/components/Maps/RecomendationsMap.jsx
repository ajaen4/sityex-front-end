
import React from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import 'react-leaflet-fullscreen/styles.css'
import { FullscreenControl } from "react-leaflet-fullscreen"
import UpdateMapCenter from "./UpdateMapCenter"

const TOKEN = process.env.REACT_APP_MAPS_API_KEY
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE

function MapWithSearch({selectedCity}){

  return (
    <MapContainer center={[selectedCity.latitude, selectedCity.longitude]} zoom={12} style={{height: "400px", width: "100%"}}>
    <UpdateMapCenter center={[selectedCity.latitude, selectedCity.longitude]} />
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`${MAP_STYLE}${TOKEN}`}
    />
    <FullscreenControl position="topright"/>
    </MapContainer>
  )
}

export default React.memo(MapWithSearch)
