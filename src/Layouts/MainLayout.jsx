import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";
import DrawerHeader from "components/Navigation/DrawerHeader";
import CityTabs from "components/Tab/CityTabs";

const MainLayout = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const theme = useTheme();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.includes("destination");
  const drawerType =
    isSmallScreen || !isDestinationPage ? "persistent" : "permanent";
  return (
    <Box>
      <Navbar setIsOpenDrawer={setIsOpenDrawer} />
      <Drawer
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
        drawer
        drawerType={drawerType}
      />

      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", margin: "0 auto" }}
      >
        <DrawerHeader />
        {isDestinationPage && isSmallScreen && (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 1.2 }}>
            <CityTabs />
          </Box>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
