"use client";

import React from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

import CitiesMarkerCluster from "components/Maps/CitiesMarkerCluster";

import { minNavbarHeights } from "constants/constants";

const CENTER = { lat: 37.76922, lng: -3.79028 };

const TOKEN = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const MAP_STYLE = process.env.NEXT_PUBLIC_MAPS_STYLE;

function DestinationsMap({}) {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  let cities = [];

  if (citiesIndex) cities = citiesIndex.cities;

  const windowHeight = "100vh";
  let windowInnerHeight = null;

  if (typeof window !== "undefined") {
    windowInnerHeight = window.innerHeight;
  }

  const height = !windowInnerHeight
    ? windowHeight
    : {
        xs: `${windowInnerHeight - minNavbarHeights.xs}px`,
        sm: `${windowInnerHeight - minNavbarHeights.sm}px`,
        md: `${windowInnerHeight - minNavbarHeights.md}px`,
        lg: `${windowInnerHeight - minNavbarHeights.lg}px`,
        xl: `${windowInnerHeight - minNavbarHeights.xl}px`,
      };

  return (
    <Box sx={{ height: height, width: "100%" }}>
      <MapContainer
        center={[CENTER["lat"], CENTER["lng"]]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        <CitiesMarkerCluster citiesIndex={cities} />
      </MapContainer>
    </Box>
  );
}

export default React.memo(DestinationsMap);
