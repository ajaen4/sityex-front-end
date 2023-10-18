import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import L from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";

import UpdateMapCenter from "components/Maps/UpdateMapCenter";
import MapsAutocomplete from "components/Autocomplete/MapsAutocomplete";

import { getCityPlaces } from "actions";

const TITLESELOPTION = "Incorrect location. ";
const LOCATIONALREADYADDED = "You have already added this location.";

const greenIcon = L.icon({
  iconUrl: require("assets/icons/pin_green.png"),
  iconSize: [40, 41]
});
const blueIcon = L.icon({
  iconUrl: require("assets/icons/pin_blue.png"),
  iconSize: [40, 41]
});

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE;
const DEFAULT_ZOOM = 14;
const DEFAULT_CENTER = [15.6594, 43.94385];

function MapWithSearch({
  selectedCity,
  updateFormPlaces,
  noPlaces,
  setNoPlaces
}) {
  const [configAlert, setConfigAlert] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentMapCenter, setCurrentMapCenter] = useState(
    selectedCity
      ? [selectedCity.coordinates.latitude, selectedCity.coordinates.longitude]
      : DEFAULT_CENTER
  );
  const [currPlaces, setCurrPlaces] = useState([]);
  const placesInDB = useSelector((state) => state.places.data.places);
  
  const dispatch = useDispatch();

  const selectedPlaceMarker = useRef(null);
  const markersInDB = useRef({});

  useEffect(() => {
    setCurrPlaces([]);
    setSelectedPlace(null);
    if (selectedCity) {
      dispatch(getCityPlaces(selectedCity.city_id));
      setCurrentMapCenter([
        selectedCity.coordinates.latitude,
        selectedCity.coordinates.longitude
      ]);
    }
  }, [selectedCity]);

  const setSelectedPlaceMarker = (element) => {
    selectedPlaceMarker.current = element;
    if (element) {
      element.on("add", function () {
        this.openPopup();
      });
    }
  };

  const addPlace = (recomendation) => {
    const newCurrPlaces = [...currPlaces, recomendation];
    setCurrPlaces(newCurrPlaces);
    updateFormPlaces(newCurrPlaces);
    selectedPlaceMarker.current?.closePopup();
    closeMarkersInDB();
    setCurrentMapCenter(null);
  };

  const closeMarkersInDB = () => {
    if (markersInDB.current) {
      Object.values(markersInDB.current).forEach((marker) =>
        marker.closePopup()
      );
    }
  };

  const isAlreadyAdded = (placeId) =>
    currPlaces.some((recomendation) => recomendation.placeId === placeId);

  const isAlreadyInDB = (place) =>
    placesInDB.some((recom) => recom.placeId === place.placeId);

  const recsNotInDB = () => currPlaces.filter((recom) => !isAlreadyInDB(recom));

  const handleRetrieve = (placeInfo) => {
    const placeCountry2Code = placeInfo.address_components.find((component) =>
      component.types.includes("country")
    ).short_name;

    const coordinates = {
      latitude: placeInfo.geometry.location.lat(),
      longitude: placeInfo.geometry.location.lng()
    };
    const countryName = placeInfo.address_components.find((component) =>
      component.types.includes("country")
    ).long_name;
    const administrativeLevel1 = placeInfo.address_components.find(
      (component) => component.types.includes("administrative_area_level_1")
    )?.long_name;
    const administrativeLevel2 = placeInfo.address_components.find(
      (component) => component.types.includes("administrative_area_level_2")
    )?.long_name;
    const placeName = placeInfo.name;
    const placeFullAddress = placeInfo.formatted_address;
    const placeCategories = placeInfo.types;
    const placeId = placeInfo.place_id;

    if (isAlreadyAdded(placeId)) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: LOCATIONALREADYADDED
      });
      return;
    }

    const selectedPlace = {
      coordinates,
      name: placeName,
      countryName,
      country2Code: placeCountry2Code,
      placeId,
      adminLevels: {},
      fullAddress: placeFullAddress,
      categories: placeCategories
    };

    if (administrativeLevel1)
      selectedPlace.adminLevels.administrativeLevel1 = administrativeLevel1;
    if (administrativeLevel2)
      selectedPlace.adminLevels.administrativeLevel2 = administrativeLevel2;

    if (isAlreadyInDB(selectedPlace)) {
      const markerInMap = markersInDB.current[placeName];
      if (markerInMap) markerInMap.openPopup();
      return;
    }

    setSelectedPlace(selectedPlace);
    setCurrentMapCenter([coordinates.latitude, coordinates.longitude]);
  };

  return (
    <>
      <MapContainer
        center={currentMapCenter}
        zoom={DEFAULT_ZOOM}
        style={{ height: "400px" }}
        scrollWheelZoom={false}
      >
        <UpdateMapCenter center={currentMapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        <FullscreenControl position="topright" />
        {selectedPlace && !isAlreadyInDB(selectedPlace) && (
          <Marker
            ref={setSelectedPlaceMarker}
            key="selectedPlaceMarker"
            draggable={false}
            position={[
              selectedPlace.coordinates.latitude,
              selectedPlace.coordinates.longitude
            ]}
            icon={greenIcon}
          >
            <Popup>
              <Container align="center" style={{ height: "100" }}>
                <Typography
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    fontWeight: "bold"
                  }}
                >
                  {selectedPlace.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => addPlace(selectedPlace)}
                >
                  Add recomendation
                </Button>
              </Container>
            </Popup>
          </Marker>
        )}
        {recsNotInDB().map((recomendation) => (
          <Marker
            key={recomendation.name}
            draggable={false}
            position={[
              recomendation.coordinates.latitude,
              recomendation.coordinates.longitude
            ]}
            icon={blueIcon}
          />
        ))}
        {placesInDB.map((recomendation) => (
          <Marker
            key={recomendation.name}
            draggable={false}
            position={[
              recomendation.coordinates.latitude,
              recomendation.coordinates.longitude
            ]}
            ref={(el) => {
              markersInDB.current[recomendation.name] = el;
            }}
          >
            <Popup>
              <Container align="center" style={{ height: "100" }}>
                <Typography
                  style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}
                >
                  {recomendation.name}
                </Typography>
                <Typography style={{ marginTop: 5, marginBottom: 5 }}>
                  Num of recomendations: {recomendation.numRec}
                </Typography>
                {!isAlreadyAdded(recomendation.placeId) && (
                  <Button
                    variant="contained"
                    onClick={() => addPlace(recomendation)}
                  >
                    Add recomendation
                  </Button>
                )}
                {isAlreadyAdded(recomendation.placeId) && (
                  <Typography style={{ marginTop: 2, marginBottom: 2 }}>
                    (Already added)
                  </Typography>
                )}
              </Container>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Box sx={{ my: 1 }}>
        <MapsAutocomplete onSelectedPlace={handleRetrieve} />
      </Box>
      <Snackbar
        open={configAlert ? true : false}
        autoHideDuration={5000}
        onClose={() => setConfigAlert(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setConfigAlert(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {configAlert?.title} {configAlert?.text}
        </Alert>
      </Snackbar>
      <Snackbar
        open={noPlaces}
        autoHideDuration={5000}
        onClose={() => setNoPlaces(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNoPlaces(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Set at least one place recommendation
        </Alert>
      </Snackbar>
    </>
  );
}

export default MapWithSearch;
