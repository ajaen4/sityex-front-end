"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useParams, usePathname } from "next/navigation";

import { useMediaQuery } from "@mui/material";

import { fetchCity, fetchCountry } from "actions";

import { Box } from "@mui/material";

import CityTabs from "components/Tab/CityTabs";
import { useShowBottomNavContext } from "components/Contexts/ShowBottomNav";
import {
  contentHeight,
  minNavbarHeight,
  minBottomNavHeight,
} from "constants/constants";

const CityLayout = ({ children }) => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [innerHeight, setInnerHeight] = useState(contentHeight);
  const { showBottomNav, setShowBottomNav } = useShowBottomNavContext();

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

  useEffect(() => {
    setShowBottomNav(isDestinationPage && !isCityEventPage && isSmallScreen);
  }, [isDestinationPage, isCityEventPage, isSmallScreen]);

  if (selectedCity === null || selectedCity.city_id !== city_id) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: innerHeight,
        backgroundColor: "grey.100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          {children}
          {showBottomNav && (
            <Box sx={{ minHeight: minBottomNavHeight }}>
              <CityTabs />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CityLayout;
