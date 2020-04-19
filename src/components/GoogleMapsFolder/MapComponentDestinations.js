
import React, {Component, useEffect, useState} from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow } from "react-google-maps";

import {
  Button,
  Alert} from "reactstrap";

import {prettyCity} from 'components/UsefulFunctions/usefulFunctions';


function Map(props){

  const dummyCity = {latitude: 0, longitude: 0, name: "", population: "" };
  const iconSmallTown = { url: require("assets/icons/small_town.png"), scaledSize: { width: 20, height: 20 } };
  const iconCity = { url: require("assets/icons/city.png"), scaledSize: { width: 30, height: 30 } };
  const iconBigCity = { url: require("assets/icons/cityscape.png"), scaledSize: { width: 33, height: 33 } };


  const [selectedCity, setSelectedCity] = useState(dummyCity);
  const [arrayCitiesIndex, setArrayCitiesIndex] = useState(Object.values(props.citiesIndex));

  useEffect(() => {

    setArrayCitiesIndex(Object.values(props.citiesIndex));

  }, [props]);

  return (
    <>
      <GoogleMap
      defaultZoom = {4}
      defaultCenter = {{lat: 52.520008, lng: 9.993682}} >
        {arrayCitiesIndex.map( city =>
          <Marker
            key = {city.name}
            name = {city.name}
            draggable = {false}
            position = {{lat: city.latitude, lng: city.longitude}}
            icon = {city.population >= 1000000 ? iconBigCity : city.population >= 300000 ? iconCity : iconSmallTown}
            onClick={() => {setSelectedCity(city);}}
          >
          {((city.latitude === selectedCity.latitude) && (city.longitude === selectedCity.longitude)) &&
            <InfoWindow
              onCloseClick={() => {
                setSelectedCity(dummyCity);
              }}
              position={{lat: selectedCity.latitude, lng: selectedCity.longitude}}>
              <div style = {{padding: "5px"}}>
                <div><b>{selectedCity.name.toUpperCase()}</b></div>
                <div>{new Intl.NumberFormat("es-418").format(selectedCity.population) + "habitantes"}</div>
                <Button href = {"destination/" + selectedCity.name} color = "success" >Mas informacion</Button>
              </div>
            </InfoWindow>
          }
          </Marker>
        )}
      </GoogleMap>
    </>
  );

}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
