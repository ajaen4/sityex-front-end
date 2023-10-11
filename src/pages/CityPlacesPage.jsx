import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { fetchCity } from "actions";

import { Box } from "@mui/material";

import RecommendationsMap from "components/Maps/RecommendationsMap";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const CityPlacesPage = () => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "City Places Page";
  }, []);

  useEffect(() => {
    dispatch(fetchCity(city_id));
  }, [dispatch, city_id]);

  if (selectedCity === null || selectedCity.city_id !== city_id)
    return <CenteredLoadingSpinner />;

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <RecommendationsMap selectedCity={selectedCity} />
    </Box>
  );
};

export default withAuth(CityPlacesPage);
