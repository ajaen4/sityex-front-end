"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";

import { fetchCity } from "actions";

import { Box } from "@mui/material";

import CityTabs from "components/Tab/CityTabs";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const CityLayout = ({ children }) => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCity(city_id));
  }, [city_id, dispatch]);

  if (selectedCity === null || selectedCity.city_id !== city_id)
    return <CenteredLoadingSpinner />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey.100",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {children}
      <CityTabs />
    </Box>
  );
};

export default CityLayout;
