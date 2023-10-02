import React, { useState, useRef, useEffect } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import L from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { SearchBox } from "@mapbox/search-js-react";
import UpdateMapZoom from "components/Maps/UpdateMapZoom";

import UpdateMapCenter from "components/Maps/UpdateMapCenter";

const TITLESELOPTION = "Incorrect location. ";
const WRONGCOUNTRYORCITY = "The location is not in the specified city";
const WRONGLOCATION = "Please select a concrete location";
const LOCATIONALREADYADDED = "You have already added this location";

const greenIcon = L.icon({
  iconUrl: require("assets/icons/pin_green.png"),
  iconSize: [40, 41],
});
const blueIcon = L.icon({
  iconUrl: require("assets/icons/pin_blue.png"),
  iconSize: [40, 41],
});

const EMPTY_PLACE = {
  coordinates: null,
  name: null,
};

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE;
const DEFAULT_ZOOM = 14;

function MapWithSearch({
  selectedCity,
  updateRecomendations,
  noRecomendations,
  setNoRecomendations,
}) {
  const [configAlert, setConfigAlert] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState({
    coordinates: null,
    name: null,
  });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [currRecomendations, setCurrRecomendations] = useState([]);
  const selectedPlaceMarker = useRef(null);
  const markersAlreadyInDB = useRef({});

  useEffect(() => {
    setCurrRecomendations([]);
    setSelectedPlace(EMPTY_PLACE);
  }, [selectedCity]);

  const setSelectedPlaceMarker = (element) => {
    selectedPlaceMarker.current = element;
    if (element) {
      element.on("add", function () {
        this.openPopup();
      });
    }
  };

  const addRecommendation = (recomendation) => {
    const newCurrRecomendations = [...currRecomendations, recomendation];
    setCurrRecomendations(newCurrRecomendations);
    updateRecomendations(newCurrRecomendations);
    setSelectedPlace(EMPTY_PLACE);
    setZoom(DEFAULT_ZOOM);
    closeMarkersInDB();
  };

  const closeMarkersInDB = () =>
    Object.values(markersAlreadyInDB.current).forEach((marker) =>
      marker.closePopup(),
    );

  const isSelectedPlaceInCity = (selectedPlaceCountry, selectedPlaceCity) =>
    selectedPlaceCountry === selectedCity.countryName &&
    selectedPlaceCity === selectedCity.name;

  const isAlreadyAdded = (placeName) =>
    currRecomendations.some(
      (recomendation) => recomendation.name === placeName,
    );

  const isAlreadyInDB = (place) =>
    selectedCity.recomendations?.some(
      (recom) =>
        recom.coordinates.latitude === place.coordinates.latitude &&
        recom.coordinates.longitude === place.coordinates.longitude,
    );

  const recsNotInDB = () =>
    currRecomendations.filter((recom) => !isAlreadyInDB(recom));

  const handleRetrieve = (res) => {
    const feature = res.features[0];

    const coordinates = feature.geometry.coordinates;

    if (!("place" in feature.properties.context)) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: WRONGLOCATION,
        color: "error",
      });
      return;
    }

    const placeCity = feature.properties.context.place.name;
    const placeCountry = feature.properties.context.country.name;
    const placeName = feature.properties.name;
    const placeFullAddress = feature.properties.full_address;
    const placeCategories = feature.properties.poi_category_ids;

    if (
      isSelectedPlaceInCity(placeCountry, placeCity) &&
      isAlreadyAdded(placeName)
    ) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: LOCATIONALREADYADDED,
        color: "error",
      });
      return;
    }

    if (!isSelectedPlaceInCity(placeCountry, placeCity)) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: WRONGCOUNTRYORCITY,
        color: "error",
      });
      return;
    }
    const selectedPlace = {
      coordinates: { latitude: coordinates[1], longitude: coordinates[0] },
      name: placeName,
      fullAddress: placeFullAddress,
      categories: placeCategories,
    };

    if (isAlreadyInDB(selectedPlace)) {
      const markerInMap = markersAlreadyInDB.current[placeName];
      if (markerInMap) markerInMap.openPopup();
    }

    if (isSelectedPlaceInCity(placeCountry, placeCity)) {
      setSelectedPlace(selectedPlace);
    }
  };

  let currentMapCenter = selectedPlace.coordinates
    ? [selectedPlace.coordinates.latitude, selectedPlace.coordinates.longitude]
    : [selectedCity.latitude, selectedCity.longitude];

  return (
    <>
      <MapContainer
        center={[selectedCity.latitude, selectedCity.longitude]}
        zoom={DEFAULT_ZOOM}
        style={{ height: "400px" }}
        scrollWheelZoom={false}
      >
        <UpdateMapCenter center={currentMapCenter} />
        <UpdateMapZoom newZoom={zoom} currRecomendations={currRecomendations} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`${MAP_STYLE}${TOKEN}`}
        />
        <FullscreenControl position="topright" />
        {selectedPlace.coordinates && !isAlreadyInDB(selectedPlace) && (
          <Marker
            ref={setSelectedPlaceMarker}
            key="selectedPlaceMarker"
            draggable={false}
            position={currentMapCenter}
            icon={greenIcon}
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
                  {selectedPlace.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => addRecommendation(selectedPlace)}
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
              recomendation.coordinates.longitude,
            ]}
            icon={blueIcon}
          />
        ))}
        {selectedCity.recomendations?.map((recomendation) => (
          <Marker
            key={recomendation.name}
            draggable={false}
            position={[
              recomendation.coordinates.latitude,
              recomendation.coordinates.longitude,
            ]}
            ref={(el) => {
              markersAlreadyInDB.current[recomendation.name] = el;
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
                  Num of recomendations: {recomendation.numOfRecomendations}
                </Typography>
                {!isAlreadyAdded(recomendation.name) && (
                  <Button
                    variant="contained"
                    onClick={() => addRecommendation(recomendation)}
                  >
                    Add recomendation
                  </Button>
                )}
                {isAlreadyAdded(recomendation.name) && (
                  <Typography style={{ marginTop: 2, marginBottom: 2 }}>
                    (Already added)
                  </Typography>
                )}
              </Container>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <SearchBox
        accessToken={TOKEN}
        placeholder="Start typing your address, e.g. 123 Main..."
        options={{ language: "en" }}
        marker={true}
        value=""
        onRetrieve={handleRetrieve}
      />
      <Container sx={{ minHeight: "50px", marginTop: "10px" }}>
        {configAlert && (
          <Alert
            severity={configAlert.color}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setConfigAlert(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              {configAlert.title} {configAlert.text}
            </AlertTitle>
          </Alert>
        )}
        {noRecomendations && (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setNoRecomendations(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>
              Please set at least one place recommendation
            </AlertTitle>
          </Alert>
        )}
      </Container>
    </>
  );
}

export default MapWithSearch;
