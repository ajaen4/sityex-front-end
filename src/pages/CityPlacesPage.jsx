import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { fetchCity } from "actions";
import { logAnalyticsEvent } from "api";

import { Box } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import CityPlacesMap from "components/Maps/CityPlacesMap";

const CityPlacesPage = () => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const dispatch = useDispatch();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Places Page",
      page_location: window.location.href,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCity(city_id));
  }, [dispatch, city_id]);

  if (selectedCity === null || selectedCity.city_id !== city_id)
    return <CenteredLoadingSpinner />;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexGrow: 1,
      }}
    >
      <CityPlacesMap selectedCity={selectedCity} />
    </Box>
  );
};

export default withAuth(CityPlacesPage);
