import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import ListingInfoWindow from "components/Maps/ListingInfoWindow";
import HousingMarkerCluster from "components/Maps/HousingMarkerCluster";

const TOKEN = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const STREET_MAP_STYLE = process.env.NEXT_PUBLIC_MAPS_STREET_STYLE;

function HousingMap() {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [selectedListing, setSelectedListing] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [toggle, setToggle] = useState(false);

  const onClickListing = useCallback(
    (listing) => {
      setSelectedListing(listing);
    },
    [setSelectedListing],
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialMap = L.map(mapContainerRef.current).setView(
        [selectedCity.coordinates.latitude, selectedCity.coordinates.longitude],
        11,
      );

      L.tileLayer(`${STREET_MAP_STYLE}${TOKEN}`, {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(initialMap);

      mapInstanceRef.current = initialMap;
      mapInstanceRef.current.setView(
        [selectedCity.coordinates.latitude, selectedCity.coordinates.longitude],
        11,
      );
      setToggle(!toggle);
    }
  }, [selectedCity.coordinates, setToggle, toggle]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} >
      <HousingMarkerCluster
        map={mapInstanceRef.current}
        onClickListing={onClickListing}
      />
      {selectedListing && (
        <ListingInfoWindow
          listing={selectedListing}
          setSelectedListing={setSelectedListing}
        />
      )}
    </div>
  );
}

export default HousingMap;
