import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import { Box, Typography } from "@mui/material";

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
        flexGrow: 1,
        position: "relative"
      }}
    >
      <CityPlacesMap selectedCity={selectedCity} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: 5,
          padding: "0.5rem"
        }}
      >
        <img
          loading="lazy"
          width="30"
          src={`https://flagcdn.com/w160/${selectedCity.country_2_code.toLowerCase()}.png`}
          alt="City Image"
          style={{ marginRight: "10px" }}
        />

        <Typography
          color="textSecondary"
          variant="h2"
          sx={{
            whiteSpace: "nowrap"
          }}
        >
          {selectedCity.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default withAuth(CityPlacesPage);
