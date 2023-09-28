import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { withAuth } from "session";
import { objectIsEmpty } from "helpers/usefulFunctions";

import { Box } from "@mui/material";

import DestinationsMap from "components/Maps/DestinationsMap";

const MapPage = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  useEffect(() => {
    document.title = "Map Page";
  }, []);

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <DestinationsMap
        citiesIndex={objectIsEmpty(citiesIndex) ? {} : citiesIndex}
      />
    </Box>
  );
};

export default withAuth(MapPage);
