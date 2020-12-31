
import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle} from "react-google-maps"


function Map({center_}){

  const center = {lat: 50.7747198, lng: 6.083920099999999}
  
  return (
    <>
      <GoogleMap
      defaultZoom = {12}
      center = {center}>
        <Circle
          center = {center}
          radius = {300}/>
      </GoogleMap>
    </>
  )

}

const HousemateMap = withScriptjs(withGoogleMap(Map))

export default HousemateMap
