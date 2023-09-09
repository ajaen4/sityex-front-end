
import React, { useState } from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow } from '@react-google-maps/api'
import { Link } from "react-router-dom"
import pinOrange from "assets/icons/pin_orange.png"
import pinBlue from "assets/icons/pin_blue.png"
import pinGreen from "assets/icons/pin_green.png"


const CENTER = {lat: 46.37783368972618, lng: 4.62754074832646}
const POPULATIONBIG = 1000000
const POPULATIONSMALL = 300000

const DUMMYCITY = {latitude: 0, longitude: 0, name: "", population: "" }
const ICONSMALLTOWN = { url: pinOrange, scaledSize: { width: 30, height: 30 } }
const ICONMEDCITY = { url: pinBlue, scaledSize: { width: 30, height: 30 } }
const ICONBIGCITY = { url: pinGreen, scaledSize: { width: 30, height: 30 } }

function DestinationsMap({citiesIndex, windowWidth}){

  const [selectedCity, setSelectedCity] = useState(DUMMYCITY)

  const arrayCitiesIndex = Object.values(citiesIndex)

  return (
      <GoogleMap
        style = {{width: "100%", height : "100%", justifyContent: "center"}}
        mapContainerStyle = {{ width: "100%", height : windowWidth > 800 ? "600px" : "450px", justifyContent: "center"}}
        zoom = {5}
        center = {CENTER}>
          {arrayCitiesIndex.map( city =>
            <Marker
              key = {city.name}
              position = {{lat: city.latitude, lng: city.longitude}}
            >
            </Marker>
          )}
      </GoogleMap>
  )
}

export default React.memo(DestinationsMap)
