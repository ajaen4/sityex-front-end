import * as React from "react";
import { useLocation } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MainItems from "components/DrawerItems/MainItems";
import CityItems from "components/DrawerItems/CityItems";

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme, drawerType) => {
  const spacing = theme.breakpoints.up("sm") ? 8 : 7;

  return {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: drawerType === "persistent" ? 0 : `calc(${theme.spacing(spacing)})`,
  };
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer({
  isOpenDrawer,
  handleChangeDrawer,
  outlet,
  drawerType,
}) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isDestinationPage = pathname.includes("destination");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
      : closedMixin(theme, drawerType),
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant={drawerType} open={isOpenDrawer} sx={drawerStyles}>
      <DrawerHeader />
        <Box>
          <Box sx={{display: "flex", justifyContent: "center", width: "100%", my: 1}}>
          <IconButton onClick={() => handleChangeDrawer(!isOpenDrawer)}  alt="expand">
          {(isOpenDrawer && drawerType === "permanent") && <MenuOpenIcon />}
          {(!isOpenDrawer && drawerType === "permanent") && <MenuIcon/>}
        </IconButton>
        </Box>
          {isDestinationPage && (
            <>
              <Divider>City</Divider>
              <CityItems handleChangeDrawer={handleChangeDrawer} />
            </>
          )}
          {drawerType === "persistent" && (
            <>
              <Divider>Navigation</Divider>
              <MainItems handleChangeDrawer={handleChangeDrawer} />
            </>
          )}
          <Divider />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", margin: "0 auto" }}
      >
        <DrawerHeader />
        {outlet}
      </Box>
    </Box>
  );
}
