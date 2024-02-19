"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";

import { fetchCity } from "actions";

import { Box } from "@mui/material";

import CityTabs from "components/Tab/CityTabs";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import { contentHeight, minNavbarHeight } from "constants/constants";

const CityLayout = ({ children }) => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [innerHeight, setInnerHeight] = useState(contentHeight);

  const dispatch = useDispatch();

  useEffect(() => {
    const innerHeightPx = window.innerHeight;

    const correctedHeight = {
      xs: `calc(${innerHeightPx}px - ${minNavbarHeight.xs})`,
      md: `calc(${innerHeightPx}px - ${minNavbarHeight.md})`,
      lg: `calc(${innerHeightPx}px - ${minNavbarHeight.lg})`,
      xl: `calc(${innerHeightPx}px - ${minNavbarHeight.xl})`,
    };

    setInnerHeight(correctedHeight);
  }, []);

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
        height: innerHeight,
        overflowY: "scroll",
      }}
    >
      {children}
      <CityTabs />
    </Box>
  );
};

export default CityLayout;
