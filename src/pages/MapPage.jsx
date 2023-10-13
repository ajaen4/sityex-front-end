import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { withAuth } from "session";
import { objectIsEmpty } from "helpers/usefulFunctions";
import { logAnalyticsEvent } from "api";

import { Box } from "@mui/material";

import DestinationsMap from "components/Maps/DestinationsMap";

const MapPage = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Map Page",
      page_location: window.location.href,
    });
  }, []);

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <DestinationsMap
        citiesIndex={
          !objectIsEmpty(citiesIndex) && citiesIndex.hasOwnProperty("cities")
            ? citiesIndex.cities
            : []
        }
      />
    </Box>
  );
};

export default withAuth(MapPage);
