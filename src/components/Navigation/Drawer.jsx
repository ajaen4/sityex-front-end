import * as React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import Box from "@mui/material/Box";
import { Drawer as MUIDrawer } from "@mui/material";
import Divider from "@mui/material/Divider";

import MainItems from "components/DrawerItems/MainItems";
import CityItems from "components/DrawerItems/CityItems";
import DrawerHeader from "components/Navigation/DrawerHeader";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

export default function Drawer({ isOpenDrawer, setIsOpenDrawer }) {

  const selectedCity = useSelector((state) => state.selectedCity.data);

  const theme = useTheme();
  const { pathname } = useLocation();
  const isDestinationPage = pathname.includes("destination");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const drawerType =
    isSmallScreen || !isDestinationPage ? "persistent" : "permanent";

  const drawerStyles = {
    position: isSmallScreen ? "fixed" : "relative",
    zIndex: theme.zIndex.drawer + 999,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(isOpenDrawer ? openedMixin(theme) : closedMixin(theme, drawerType)),
    "& .MuiDrawer-paper": isOpenDrawer
      ? openedMixin(theme)
      : closedMixin(theme, drawerType)
  };

  return (
    <MUIDrawer variant={drawerType} open={isOpenDrawer} sx={drawerStyles}>
      <DrawerHeader />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1
          }}
        >
        </Box>
        {isDestinationPage && !isSmallScreen && (
          <>
            <Divider>{selectedCity?.name}</Divider>
            <CityItems setIsOpenDrawer={setIsOpenDrawer} />
          </>
        )}
        {drawerType === "persistent" && (
          <>
            <Divider>Navigation</Divider>
            <MainItems setIsOpenDrawer={setIsOpenDrawer} />
          </>
        )}
        <Divider />
      </Box>
    </MUIDrawer>
  );
}
