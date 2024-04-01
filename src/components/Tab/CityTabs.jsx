"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

import { useMediaQuery, Box } from "@mui/material";

import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

import { useShowBotNavContext } from "components/Contexts/ShowBotNavContext";

import { minBottomNavHeight } from "constants/constants";
import * as ROUTES_PATHS from "routes/paths";

export default function CityTabs() {
  const [value, setValue] = useState(-1);

  const theme = useTheme();
  const pathname = usePathname();

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth);

  const { showBotNav, setShowBotNav } = useShowBotNavContext();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isServicesPage = pathname.split("/").includes("services");
  const isCityEventPage = pathname.split("/").includes("event");

  const router = useRouter();

  const getTabValue = useCallback(() => {
    const path = pathname.split("/");

    if (path.includes(ROUTES_PATHS.CITY_PAPERWORK)) setValue(0);
    if (path.includes(ROUTES_PATHS.CITY_HOUSING)) setValue(1);
    if (path.includes(ROUTES_PATHS.CITY_COMMUNITY)) setValue(2);
  }, [pathname]);

  const itemSelected = (event, value) => {
    const path = event.currentTarget.getAttribute("data-path");
    const destinationURL = `/services/${selectedCity.city_id}/${path}`;

    setValue(value);
    router.push(destinationURL);
  };

  useEffect(() => {
    setShowBotNav(isServicesPage && isSmallScreen);
  }, [isServicesPage, isCityEventPage, isSmallScreen, setShowBotNav]);

  useEffect(() => {
    getTabValue();
  }, [getTabValue]);

  if (!showBotNav) return null;

  return (
    <Box sx={{ minHeight: minBottomNavHeight }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          zIndex: 1100,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={itemSelected}
          style={{ minHeight: 60, backgroundColor: "rgba(128, 128, 128, 0.8)" }}
        >
          <BottomNavigationAction
            label="Paperwork"
            icon={<GovernmentIcon />}
            sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
            data-path={ROUTES_PATHS.CITY_PAPERWORK}
          />
          <BottomNavigationAction
            label="Housing"
            icon={<HouseIcon />}
            data-path={ROUTES_PATHS.CITY_HOUSING}
            sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
          />

          <BottomNavigationAction
            label="Community"
            icon={<PeopleIcon />}
            sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
            data-path={ROUTES_PATHS.CITY_COMMUNITY}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
