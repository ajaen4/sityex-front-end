import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import "leaflet/dist/leaflet.css";
import { FullscreenControl } from "react-leaflet-fullscreen";

import ListingInfoWindow from "components/Maps/ListingInfoWindow";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import { fetchHousingListing } from "actions";
import HousingMarkerCluster from "components/Maps/HousingMarkerCluster";

const TOKEN = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const STREET_MAP_STYLE = process.env.NEXT_PUBLIC_MAPS_STREET_STYLE;

const ZoomHandler = ({ onZoom }) => {
  useMapEvents({
    zoomend: (e) => {
      onZoom(e.target.getZoom());
    },
  });
  return null;
};

function HousingMap() {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const housingIndex = useSelector((state) => state.housing.data);
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(11);

  const onClickListing = useCallback(
    (listing) => {
      fetchHousingListing(selectedCity.city_id, listing.housing_id).then(
        (listing) => {
          setSelectedListing(listing);
        },
      );
    },
    [selectedCity.city_id],
  );

  if (!housingIndex) {
    return <CenteredLoadingSpinner />;
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
        listings={housingIndex.index}
        onClickListing={onClickListing}
        currentZoom={currentZoom}
      />
      <ZoomHandler onZoom={setCurrentZoom} />
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
