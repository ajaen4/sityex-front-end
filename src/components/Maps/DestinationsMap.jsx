import React from "react";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { Box } from "@mui/material";

import CitiesMarkerCluster from "components/Maps/CitiesMarkerCluster";

const CENTER = { lat: 46.37783368972618, lng: 4.62754074832646 };

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE;

function DestinationsMap({ citiesIndex }) {
  return (
    <Box
      sx={{
        height: {
          xs: "86vh",
          md: "82.5vh",
          lg: "91.5vh",
          xl: "93vh",
        },
        width: "100%",
      }}
    >
      <MapContainer
        center={[CENTER["lat"], CENTER["lng"]]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        <CitiesMarkerCluster citiesIndex={citiesIndex} />
      </MapContainer>
    </Box>
  );
}

export default DestinationsMap;
