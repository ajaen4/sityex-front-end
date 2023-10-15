import React, { useState, useRef, useEffect } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet-fullscreen/styles.css";
import L from "leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";

import UpdateMapZoom from "components/Maps/UpdateMapZoom";
import UpdateMapCenter from "components/Maps/UpdateMapCenter";
import MapsAutocomplete from "components/Autocomplete/MapsAutocomplete";

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

const TOKEN = process.env.REACT_APP_MAPS_API_KEY;
const MAP_STYLE = process.env.REACT_APP_MAPS_STYLE;
const DEFAULT_ZOOM = 14;
const DEFAULT_CENTER = [45.54558, 126.95191];

function MapWithSearch({
  selectedCity,
  updateRecomendations,
  noRecomendations,
  setNoRecomendations,
}) {
  const [configAlert, setConfigAlert] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [currRecomendations, setCurrRecomendations] = useState([]);
  const selectedPlaceMarker = useRef(null);
  const markersAlreadyInDB = useRef({});

  useEffect(() => {
    setCurrRecomendations([]);
    setSelectedPlace(null);
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
    setSelectedPlace(null);
    setZoom(DEFAULT_ZOOM);
    closeMarkersInDB();
  };

  const closeMarkersInDB = () =>
    Object.values(markersAlreadyInDB.current).forEach((marker) =>
      marker.closePopup(),
    );

  const isSelectedPlaceInCity = (
    selectedPlaceCountry2Code,
    selectedPlaceCity,
  ) => {
    return (
      selectedPlaceCountry2Code === selectedCity.country_2_code &&
      selectedPlaceCity === selectedCity.name
    );
  };

  const isAlreadyAdded = (placeId) =>
    currRecomendations.some(
      (recomendation) => recomendation.placeId === placeId,
    );

  const isAlreadyInDB = (place) =>
    selectedCity?.recomendations?.some(
      (recom) => recom.placeId === place.placeId,
    );

  const recsNotInDB = () =>
    currRecomendations.filter((recom) => !isAlreadyInDB(recom));

  const handleRetrieve = (placeInfo) => {
    const placeCountry2Code = placeInfo.address_components.find((component) =>
      component.types.includes("country"),
    ).short_name;

    if (selectedCity.country_2_code !== placeCountry2Code) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: WRONGLOCATION,
        color: "error",
      });
      return;
    }

    const coordinates = {
      latitude: placeInfo.geometry.location.lat(),
      longitude: placeInfo.geometry.location.lng(),
    };
    const countryName = placeInfo.address_components.find((component) =>
      component.types.includes("country"),
    ).long_name;
    const administrativeLevel1 = placeInfo.address_components.find(
      (component) => component.types.includes("administrative_area_level_1"),
    ).long_name;
    const administrativeLevel2 = placeInfo.address_components.find(
      (component) => component.types.includes("administrative_area_level_2"),
    ).long_name;
    const placeName = placeInfo.name;
    const placeFullAddress = placeInfo.formatted_address;
    const placeCategories = placeInfo.types;
    const placeId = placeInfo.place_id;

    if (
      isSelectedPlaceInCity(placeCountry2Code, administrativeLevel2) &&
      isAlreadyAdded(placeId)
    ) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: LOCATIONALREADYADDED,
        color: "error",
      });
      return;
    }

    if (!isSelectedPlaceInCity(placeCountry2Code, administrativeLevel2)) {
      setConfigAlert({
        title: TITLESELOPTION,
        text: WRONGCOUNTRYORCITY,
        color: "error",
      });
      return;
    }

    const selectedPlace = {
      coordinates,
      name: placeName,
      countryName,
      country2Code: placeCountry2Code,
      placeId,
      adminLevels: {
        administrativeLevel1,
        administrativeLevel2,
      },
      fullAddress: placeFullAddress,
      categories: placeCategories,
    };

    if (isAlreadyInDB(selectedPlace)) {
      const markerInMap = markersAlreadyInDB.current[placeName];
      if (markerInMap) markerInMap.openPopup();
      return;
    }

    setSelectedPlace(selectedPlace);
  };

  let currentMapCenter =
    (selectedPlace && [
      selectedPlace.coordinates.latitude,
      selectedPlace.coordinates.longitude,
    ]) ||
    (selectedCity && [
      selectedCity.coordinates.latitude,
      selectedCity.coordinates.longitude,
    ]) ||
    DEFAULT_CENTER;

  return (
    <>
      <MapContainer
        center={currentMapCenter}
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
        {selectedPlace && !isAlreadyInDB(selectedPlace) && (
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
        {selectedCity?.recomendations?.map((recomendation) => (
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
                {!isAlreadyAdded(recomendation.placeId) && (
                  <Button
                    variant="contained"
                    onClick={() => addRecommendation(recomendation)}
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
      <Box sx={{ minHeight: "70px", marginTop: "5px" }}>
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
            <AlertTitle>Set at least one place recommendation</AlertTitle>
          </Alert>
        )}
      </Box>
    </>
  );
}

export default MapWithSearch;
