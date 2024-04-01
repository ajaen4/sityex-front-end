"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import { Drawer as MUIDrawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import MainItems from "components/DrawerItems/MainItems";
import CityItems from "components/DrawerItems/CityItems";
import { useDrawerContext } from "components/Contexts/DrawerContext";

import NavBarPlaceholder from "components/Navigation/NavBarPlaceholder";

import { drawerWidth, tabletDrawerWidth } from "constants/constants";

export default function Drawer() {
  const { isOpenDrawer, setIsOpenDrawer } = useDrawerContext();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const pathname = usePathname();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const paths = ["services"];

    if (isSmallScreen) {
      setIsOpenDrawer(false);
      return;
    }

    if (!paths.some((path) => pathname.includes(path))) {
      setIsOpenDrawer(false);
      return;
    }

    if (paths.some((path) => pathname.includes(path))) {
      setIsOpenDrawer(true);
      return;
    }
  }, [pathname, isSmallScreen, setIsOpenDrawer]);

  const handleDrawerToggle = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  return (
    <Box>
      <MUIDrawer
        variant="temporary"
        open={isOpenDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { md: tabletDrawerWidth, lg: drawerWidth },
          },
        }}
      >
        <NavBarPlaceholder />
        <Divider sx={{ mt: 3 }}>Navigation</Divider>
        <MainItems />
      </MUIDrawer>
      <MUIDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isOpenDrawer
              ? { md: tabletDrawerWidth, lg: drawerWidth }
              : 0,
          },
          width: isOpenDrawer ? { md: tabletDrawerWidth, lg: drawerWidth } : 0,
        }}
      >
        <NavBarPlaceholder />
        <Divider sx={{ mt: 3 }}>{selectedCity?.name}</Divider>
        <CityItems />
      </MUIDrawer>
    </Box>
  );
}
