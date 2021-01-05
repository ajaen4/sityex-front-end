
import React, { useState } from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow } from '@react-google-maps/api'
import { Link } from "react-router-dom"
import { Button } from "reactstrap"


const CENTER = {lat: 52.520008, lng: 9.993682}
const POPULATIONBIG = 1000000
const POPULATIONSMALL = 300000

const DUMMYCITY = {latitude: 0, longitude: 0, name: "", population: "" }
const ICONSMALLTOWN = { url: require("assets/icons/pin_orange.png"), scaledSize: { width: 30, height: 30 } }
const ICONMEDCITY = { url: require("assets/icons/pin_blue.png"), scaledSize: { width: 30, height: 30 } }
const ICONBIGCITY = { url: require("assets/icons/pin_green.png"), scaledSize: { width: 30, height: 30 } }

function DestinationsMap({citiesIndex, windowWidth}){

  const [selectedCity, setSelectedCity] = useState(DUMMYCITY)

  const arrayCitiesIndex = Object.values(citiesIndex)

  return (
      <GoogleMap
        style = {{width: "100%", height : "100%", justifyContent: "center"}}
        mapContainerStyle = {{ width: "100%", height : windowWidth > 800 ? "600px" : "450px", justifyContent: "center"}}
        zoom = {4}
        center = {CENTER}>
          {arrayCitiesIndex.map( city =>
            <Marker
              key = {city.name}
              name = {city.name}
              draggable = {false}
              position = {{lat: city.latitude, lng: city.longitude}}
              icon = {city.population >= POPULATIONBIG ? ICONBIGCITY : city.population >= POPULATIONSMALL ? ICONMEDCITY : ICONSMALLTOWN}
              onClick={() => {setSelectedCity(city)}}
            >
            {((city.latitude === selectedCity.latitude) && (city.longitude === selectedCity.longitude)) &&
              <InfoWindow
                onCloseClick={() => {
                  setSelectedCity(DUMMYCITY)
                }}
                position={{lat: selectedCity.latitude, lng: selectedCity.longitude}}>
                <div style = {{padding: "5px"}}>
                  <div><b>{selectedCity.name.toUpperCase()}</b></div>
                  <div>{new Intl.NumberFormat("es-418").format(selectedCity.population) + " habitantes"}</div>
                  <Link to = {"destination/" + selectedCity.name}>
                    <Button color = "success" >Mas informacion</Button>
                  </Link>
                </div>
              </InfoWindow>
            }
            </Marker>
          )}
      </GoogleMap>
  )
}

export default React.memo(DestinationsMap)
