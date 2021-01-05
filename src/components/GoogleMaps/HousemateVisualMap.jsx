
import React from "react"

import {
  GoogleMap,
  Circle} from '@react-google-maps/api'


const blue = "#3493eb"

const options = {
  strokeColor: blue,
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: blue,
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
}

const RADIUS_TYPES = {
  "0.5 km" : 500,
  "1 km" : 1000,
  "1.5 km" : 1500,
  "2 km" : 2000
}

function HousemateVisualMap({center, circleRadiusProp}){

  const circleRadius = RADIUS_TYPES[circleRadiusProp]
  return (
        <GoogleMap
          style = {{width: "100%", height : "100%", justifyContent: "center"}}
          mapContainerStyle = {{ width: "100%", height : "300px", justifyContent: "center"}}
          zoom = {12}
          center = {center}>
          <Circle
            center = {center}
            radius = {circleRadius}
            options = {options}/>
        </GoogleMap>
  )

}

export default React.memo(HousemateVisualMap)
