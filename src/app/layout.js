import React from "react";

import { Box } from "@mui/material";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";
import NavBarPlaceholder from "components/Navigation/NavBarPlaceholder";
import StoreProvider from "./StoreProvider";
import DataLoader from "components/DataLoaders/DataLoader";
import { DrawerProvider } from "components/Contexts/DrawerContext";

import ThemeRegistry from "theme/ThemeRegistry";

import { drawerWidth, tabletDrawerWidth } from "constants/constants";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <DrawerProvider>
            <ThemeRegistry options={{ key: "mui-theme" }}>
              <Box
                sx={{
                  display: "flex",
                  overflowY: "hidden",
                }}
              >
                <DataLoader />
                <Navbar />
                <Drawer />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    width: {
                      md: `calc(100% - ${tabletDrawerWidth}px)`,
                      lg: `calc(100% - ${drawerWidth}px)`,
                    },
                    overflow: "scroll",
                  }}
                >
                  <NavBarPlaceholder />
                  {children}
                </Box>
              </Box>
            </ThemeRegistry>
          </DrawerProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
