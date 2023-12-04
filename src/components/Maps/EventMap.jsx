import React from "react";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import { FullscreenControl } from "react-leaflet-fullscreen";

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
const STREET_MAP_STYLE = process.env.REACT_APP_MAPS_STREET_STYLE;

function EventMap({ eventCoordinates }) {
  return (
    <MapContainer
      center={[eventCoordinates.latitude, eventCoordinates.longitude]}
      zoom={17}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <FullscreenControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`${STREET_MAP_STYLE}${TOKEN}`}
      />
      <Marker
        draggable={false}
        position={[eventCoordinates.latitude, eventCoordinates.longitude]}
      ></Marker>
    </MapContainer>
  );
}

export default EventMap;
