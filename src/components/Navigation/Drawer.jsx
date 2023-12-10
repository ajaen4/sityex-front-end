import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import { Drawer as MUIDrawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MainItems from "components/DrawerItems/MainItems";
import CityItems from "components/DrawerItems/CityItems";

import {
  drawerWidth,
  tabletDrawerWidth,
  minNavbarHeights
} from "constants/constants";

export default function Drawer({ isOpenDrawer, setIsOpenDrawer, ...props }) {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const { window } = props;
  const { pathname } = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const isLandingPage = pathname.split("/").every((str) => str === "");

  useEffect(() => {
    const paths = ["destination"];

    if (isSmallScreen) {
      setIsOpenDrawer(false);
      return;
    }

    if (!paths.some((path) => location.pathname.includes(path))) {
      setIsOpenDrawer(false);
      return;
    }

    if (paths.some((path) => location.pathname.includes(path))) {
      setIsOpenDrawer(true);
      return;
    }
  }, [pathname]);

  const handleDrawerToggle = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: isOpenDrawer ? { md: tabletDrawerWidth, lg: drawerWidth } : 0,
        flexShrink: { md: 0 }
      }}
      aria-label="mailbox folders"
    >
      <MUIDrawer
        container={container}
        variant="temporary"
        open={isOpenDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { md: tabletDrawerWidth, lg: drawerWidth }
          }
        }}
      >
        <Box sx={{ minHeight: minNavbarHeights }} />
        <Divider sx={{ mt: 3 }}>Navigation</Divider>
        <MainItems />
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isOpenDrawer ? { md: tabletDrawerWidth, lg: drawerWidth } : 0
          },
          width: isOpenDrawer ? { md: tabletDrawerWidth, lg: drawerWidth } : 0
        }}
      >
        {!isLandingPage && <Box sx={{ minHeight: minNavbarHeights }} />}
        <Divider sx={{ mt: 3 }}>{selectedCity?.name}</Divider>
        <CityItems />
      </MUIDrawer>
    </Box>
  );
}
