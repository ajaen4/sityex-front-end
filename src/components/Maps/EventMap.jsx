import React from "react";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FullscreenControl } from "react-leaflet-fullscreen";
import L from "leaflet";

const TOKEN = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const STREET_MAP_STYLE = process.env.NEXT_PUBLIC_MAPS_STREET_STYLE;

const customMarkerIcon = L.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function EventMap({ eventCoordinates }) {
  return (
    <MapContainer
      center={[eventCoordinates[0], eventCoordinates[1]]}
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
        icon={customMarkerIcon}
        draggable={false}
        position={[eventCoordinates[0], eventCoordinates[1]]}
      ></Marker>
    </MapContainer>
  );
}

export default EventMap;
