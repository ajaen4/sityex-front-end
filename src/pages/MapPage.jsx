import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import { Box } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const DestinationsMap = React.lazy(() =>
  import("components/Maps/DestinationsMap")
);

const MapPage = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Map Page",
      page_location: window.location.href
    });
  }, []);

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <Suspense fallback={<CenteredLoadingSpinner />}>
        <DestinationsMap citiesIndex={citiesIndex ? citiesIndex.cities : []} />
      </Suspense>
    </Box>
  );
};

export default withAuth(MapPage);
