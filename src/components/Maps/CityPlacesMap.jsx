import React, { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { getCityPlaces } from "actions";

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE;

function CityPlacesMap({ selectedCity }) {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getCityPlaces(selectedCity.city_id).then((places) => {
      if (places) setPlaces(places);
    });
  }, [selectedCity]);

  return (
    <MapContainer
      center={[
        selectedCity.coordinates.latitude,
        selectedCity.coordinates.longitude,
      ]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`${MAP_STYLE}${TOKEN}`}
      />
      {places.map((place) => (
        <Marker
          key={place.name}
          draggable={false}
          position={[
            place.coordinates.latitude,
            place.coordinates.longitude,
          ]}
        >
          <Popup>
            <Container align="center" style={{ height: "100" }}>
              <Typography
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                {place.name}
              </Typography>
              <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                Type: {place.categories[0]}
              </Typography>
              <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                Num of recommendations: {place.numRec}
              </Typography>
            </Container>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default CityPlacesMap;
