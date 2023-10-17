import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import { Box } from "@mui/material";

import CityPlacesMap from "components/Maps/CityPlacesMap";

const CityPlacesPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Places Page",
      page_location: window.location.href
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexGrow: 1
      }}
    >
      <CityPlacesMap selectedCity={selectedCity} />
    </Box>
  );
};

export default withAuth(CityPlacesPage);
