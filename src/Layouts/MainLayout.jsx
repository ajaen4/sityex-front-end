import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";

import { drawerWidth } from "constants/constants";

const MainLayout = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        height: `${viewportHeight}px`,
        overflowY: "hidden"
      }}
    >
      <Navbar isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <Drawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "hidden"
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
