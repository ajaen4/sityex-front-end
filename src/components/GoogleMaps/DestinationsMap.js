
import React, { useState } from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow} from "react-google-maps"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

function Map({citiesIndex}){

  const dummyCity = {latitude: 0, longitude: 0, name: "", population: "" }
  const iconSmallTown = { url: require("assets/icons/pin_orange.png"), scaledSize: { width: 30, height: 30 } }
  const iconCity = { url: require("assets/icons/pin_blue.png"), scaledSize: { width: 30, height: 30 } }
  const iconBigCity = { url: require("assets/icons/pin_green.png"), scaledSize: { width: 30, height: 30 } }

  const POPULATIONBIG = 1000000
  const POPULATIONSMALL = 300000

  const [selectedCity, setSelectedCity] = useState(dummyCity)

  const arrayCitiesIndex = Object.values(citiesIndex)
  return (
    <>
      <GoogleMap
      defaultZoom = {4}
      defaultCenter = {{lat: 52.520008, lng: 9.993682}}
      mapId = '144aa57054190a92' >
        {arrayCitiesIndex.map( city =>
          <Marker
            key = {city.name}
            name = {city.name}
            draggable = {false}
            position = {{lat: city.latitude, lng: city.longitude}}
            icon = {city.population >= POPULATIONBIG ? iconBigCity : city.population >= POPULATIONSMALL ? iconCity : iconSmallTown}
            onClick={() => {setSelectedCity(city)}}
          >
          {((city.latitude === selectedCity.latitude) && (city.longitude === selectedCity.longitude)) &&
            <InfoWindow
              onCloseClick={() => {
                setSelectedCity(dummyCity)
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
    </>
  )

}

const DestinationsMap = withScriptjs(withGoogleMap(Map))

export default DestinationsMap
