import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";
import CityTabs from "components/Tab/CityTabs";
import DrawerHeader from "components/Navigation/DrawerHeader";

const MainLayout = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(0);

  const theme = useTheme();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.includes("destination");
  const drawerType =
    isSmallScreen || !isDestinationPage ? "persistent" : "permanent";

  useEffect(() => {
    if (!isSmallScreen && isDestinationPage && isOpenDrawer) {
      setDrawerWidth(240);
    }
    
    if (!isSmallScreen && isDestinationPage && !isOpenDrawer) {
      setDrawerWidth(65);
    }
  }, [isSmallScreen, isDestinationPage, isOpenDrawer]);


  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <Navbar isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <Drawer
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        drawerType={drawerType}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <DrawerHeader />
        {isDestinationPage && isSmallScreen && (
          <Box sx={{ p: 1.5, display: "flex", justifyContent: "center" }}>
            <CityTabs />
          </Box>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
