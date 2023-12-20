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

export const viewport = {
  themeColor: "#2196f3",
};

export const metadata = {
  generator: "SityEx",
  applicationName: "SityEx",
  creator: "Alberto Jaen",
  manifest: "https://www.sityex.com/manifest.json",
  title: {
    default: "SityEx | Discover, Connect, Belong",
  },
  description:
    "Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today.",
  openGraph: {
    type: "website",
    url: "https://sityex.com/",
    title: "SityEx | Discover, Connect, Belong",
    description:
      "Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today.",
    images: [
      "https://d1dshnpqadx0e7.cloudfront.net/logos/resized_big_logo_blue.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SityEx | Discover, Connect, Belong",
    description:
      "Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today.",
    images: [
      "https://d1dshnpqadx0e7.cloudfront.net/logos/resized_big_logo_blue.png",
    ],
    url: "https://sityex.com/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="rqpcK6RBveELxXz0UrvCJb4EEi-bGF-W4QSK58hIuS8"
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
