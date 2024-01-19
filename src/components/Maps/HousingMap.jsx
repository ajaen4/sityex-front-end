"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { MapContainer, TileLayer } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";
import { FullscreenControl } from "react-leaflet-fullscreen";

import HousingMarkerCluster from "components/Maps/HousingMarkerCluster";
import ListingInfoWindow from "components/Maps/ListingInfoWindow";

import { fetchHousingListing } from "actions";

const TOKEN = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const STREET_MAP_STYLE = process.env.NEXT_PUBLIC_MAPS_STREET_STYLE;

function HousingMap({}) {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const housingIndex = useSelector((state) => state.housing.data);
  const [selectedListing, setSelectedListing] = useState(null);

  const onClickListing = (listing) => {
    fetchHousingListing(selectedCity.city_id, listing.housing_id).then(
      (listing) => {
        setSelectedListing(listing);
      },
    );
  };

  if (!housingIndex) {
    return null;
  }

  return (
    <MapContainer
      center={[
        selectedCity.coordinates.latitude,
        selectedCity.coordinates.longitude,
      ]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <FullscreenControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`${STREET_MAP_STYLE}${TOKEN}`}
      />
      <HousingMarkerCluster
        housingIndex={housingIndex.listings}
        onClickListing={onClickListing}
      />
      {selectedListing && (
        <ListingInfoWindow
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
        />
      )}
    </MapContainer>
  );
}

export default HousingMap;
