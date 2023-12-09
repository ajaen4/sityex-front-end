import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";

import {
  drawerWidth,
  tabletDrawerWidth,
  minNavbarHeights
} from "constants/constants";

const MainLayout = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { pathname } = useLocation();
  const isLandingPage = pathname.split("/").every((str) => str === "");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflowY: "hidden"
      }}
    >
      <Navbar isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <Drawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: {
            md: `calc(100% - ${tabletDrawerWidth}px)`,
            lg: `calc(100% - ${drawerWidth}px)`
          },
          overflow: "hidden"
        }}
      >
        {!isLandingPage && <Box sx={{ minHeight: minNavbarHeights }} />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
