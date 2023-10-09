import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity } from "actions";

import { Box } from "@mui/material";

import RecommendationsMap from "components/Maps/RecommendationsMap";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const CityPlacesPage = () => {
  const { location } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "City Places Page";
  }, []);

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));
  }, [dispatch, location]);

  if (selectedCity === null || selectedCity.name !== prettyCity(location))
    return <CenteredLoadingSpinner />;

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <RecommendationsMap selectedCity={selectedCity} />
    </Box>
  );
};

export default withAuth(CityPlacesPage);
