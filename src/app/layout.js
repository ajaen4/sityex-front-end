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

export const metadata = {
  title: "SityEx | Discover, Connect, Belong",
  description:
    "Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <meta
          name="google-site-verification"
          content="rqpcK6RBveELxXz0UrvCJb4EEi-bGF-W4QSK58hIuS8"
        />
        <meta name="theme-color" content="#2196f3" />
        <link rel="canonical" href="https://www.sityex.com/" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/small_logo_blue.png" />
        {/*Facebook*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sityex.com/" />
        <meta
          property="og:title"
          content="SityEx - Discover, Connect, Belong"
        />
        <meta
          property="og:description"
          content="Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today."
        />
        <meta
          property="og:image"
          content="https://sityex-public-images.s3.eu-west-1.amazonaws.com/logos/resized_big_logo_blue.png"
        />
        {/*Twitter*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://sityex.com/" />
        <meta
          property="twitter:title"
          content="SityEx - Discover, Connect, Belong"
        />
        <meta
          property="twitter:description"
          content="Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today."
        />
        <meta
          property="twitter:image"
          content="https://sityex-public-images.s3.eu-west-1.amazonaws.com/logos/resized_big_logo_blue.png"
        />
      </head>
      <body>
        <StoreProvider>
          <DrawerProvider>
            <ThemeRegistry options={{ key: "mui-theme" }}>
              <Box
                sx={{
                  display: "flex",
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
                    overflowY: "scroll",
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
