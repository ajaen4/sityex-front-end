import React, { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";
import DrawerHeader from "components/Navigation/DrawerHeader";

const MainLayout = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(0);

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const theme = useTheme();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.split("/").includes("destination");
  const drawerType =
    isSmallScreen || !isDestinationPage ? "persistent" : "permanent";

  useEffect(() => {
    if (!isSmallScreen && isDestinationPage && isOpenDrawer) {
      setDrawerWidth(240);
      return;
    }

    if (!isSmallScreen && isDestinationPage && !isOpenDrawer) {
      setDrawerWidth(65);
      return;
    }

    setDrawerWidth(0);
  }, [isSmallScreen, isOpenDrawer, pathname]);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: `${viewportHeight}px`,
        overflowY: "hidden"
      }}
    >
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
          marginLeft: `${drawerWidth}px`,
          overflow: "hidden"
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
