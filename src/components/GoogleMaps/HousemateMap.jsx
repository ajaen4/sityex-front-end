
import React from "react"
import {
  GoogleMap,
  LoadScript,
  Circle } from '@react-google-maps/api'

import {MAPS_API_KEY} from "./mapKeys"

const CENTER = {lat: 50.7747198, lng: 6.083920099999999}

function HousemateMap({center_}){

  return (
    <LoadScript googleMapsApiKey = {MAPS_API_KEY}>
      <GoogleMap
        style = {{width: "100%", height : "100%", justifyContent: "center"}}
        mapContainerStyle = {{ width: "100%", height : "500px", justifyContent: "center"}}
        zoom = {12}
        center = {CENTER}>
        <Circle
          center = {CENTER}
          radius = {300}/>
      </GoogleMap>
    </LoadScript>
  )

}

export default React.memo(HousemateMap)
