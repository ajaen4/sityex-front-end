import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";

import { useMediaQuery, Box } from "@mui/material";

import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";

import { useShowBotNavContext } from "components/Contexts/ShowBotNavContext";
import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";

import { minBottomNavHeight } from "constants/constants";
import * as ROUTES_PATHS from "routes/paths";

export default function CityTabs() {
  const [value, setValue] = useState(-1);

  const theme = useTheme();
  const pathname = usePathname();

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth);

  const { showBotNav, setShowBotNav } = useShowBotNavContext();
  const { setShowSignUpModal } = useShowSignUpContext();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.split("/").includes("destination");
  const isCityEventPage = pathname.split("/").includes("event");

  const router = useRouter();

  const getTabValue = () => {
    const path = pathname.split("/");

    if (path.includes(ROUTES_PATHS.CITY_BUREAUCRACY)) setValue(0);
    if (path.includes(ROUTES_PATHS.CITY_HOUSING)) setValue(1);
    if (path.includes(ROUTES_PATHS.CITY_EVENTS)) setValue(2);
    if (path.includes(ROUTES_PATHS.CITY_COMMUNITY)) setValue(3);
  };

  const itemSelected = (event, value) => {
    const path = event.currentTarget.getAttribute("data-path");
    const destinationURL = `/destination/${selectedCity.city_id}/${path}`;

    if (path === ROUTES_PATHS.CITY_COMMUNITY && auth.isAuthResolved === false) {
      setShowSignUpModal(true);
      localStorage.setItem("destinationURL", destinationURL);
    } else {
      setValue(value);
      router.push(destinationURL);
    }
  };

  useEffect(() => {
    setShowBotNav(isDestinationPage && isSmallScreen);
  }, [isDestinationPage, isCityEventPage, isSmallScreen]);

  useEffect(() => {
    getTabValue();
  }, [pathname]);

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
            data-path={ROUTES_PATHS.CITY_BUREAUCRACY}
          />
          <BottomNavigationAction
            label="Housing"
            icon={<HouseIcon />}
            data-path={ROUTES_PATHS.CITY_HOUSING}
            sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
          />
          <BottomNavigationAction
            label="Events"
            icon={<TicketIcon />}
            sx={{ color: "white", "&.Mui-selected": { color: "white" } }}
            data-path={ROUTES_PATHS.CITY_EVENTS}
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
