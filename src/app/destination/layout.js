"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useParams, usePathname } from "next/navigation";

import { useMediaQuery } from "@mui/material";

import { fetchCity, fetchCountry } from "actions";

import { Box, Typography } from "@mui/material";

import CityTabs from "components/Tab/CityTabs";
import { contentHeight, minNavbarHeight } from "constants/constants";

const CityLayout = ({ children }) => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [innerHeight, setInnerHeight] = useState(contentHeight);

  const theme = useTheme();
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.split("/").includes("destination");
  const isCityEventPage = pathname.split("/").includes("event");

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
  }, [city_id]);

  useEffect(() => {
    if (selectedCity) dispatch(fetchCountry(selectedCity.country_3_code));
  }, [selectedCity]);

  if (selectedCity === null || selectedCity.city_id !== city_id) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: innerHeight,
        backgroundColor: "grey.100",
        overflow: "scroll",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <img
          loading="lazy"
          width="30"
          src={`https://flagcdn.com/w160/${selectedCity.country_2_code.toLowerCase()}.png`}
          alt="City Image"
          style={{ marginRight: "10px" }}
        />

        <Typography color="textSecondary" variant="h2">
          {selectedCity.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      {isDestinationPage && !isCityEventPage && isSmallScreen && <CityTabs />}
    </Box>
  );
};

export default CityLayout;
