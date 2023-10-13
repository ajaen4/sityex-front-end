import * as React from "react";
import { useLocation } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import Box from "@mui/material/Box";
import { Drawer as MUIDrawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import MainItems from "components/DrawerItems/MainItems";
import CityItems from "components/DrawerItems/CityItems";
import DrawerHeader from "components/Navigation/DrawerHeader";
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

export default function Drawer({ isOpenDrawer, setIsOpenDrawer, drawerType }) {
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
      <MUIDrawer variant={drawerType} open={isOpenDrawer} sx={drawerStyles}>
        <DrawerHeader />
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              my: 1,
            }}
          >
            <IconButton
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              alt="expand"
            >
              {isOpenDrawer && drawerType === "permanent" && <MenuOpenIcon />}
              {!isOpenDrawer && drawerType === "permanent" && <MenuIcon />}
            </IconButton>
          </Box>
          {isDestinationPage && !isSmallScreen && (
            <>
              <Divider>City</Divider>
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
    </Box>
  );
}
