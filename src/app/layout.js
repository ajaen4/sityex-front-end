import React from "react";

import { Box } from "@mui/material";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";
import NavBarPlaceholder from "components/Navigation/NavBarPlaceholder";
import StoreProvider from "./StoreProvider";
import DataLoader from "components/DataLoaders/DataLoader";
import { DrawerProvider } from "components/Contexts/DrawerContext";
import { ShowBottomNavProvider } from "components/Contexts/ShowBottomNav";

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
  manifest: "https://sityex.com/manifest.json",
  title: {
    default: "SityEx | One-stop platform for expats",
  },
  description:
    "SityEx is a community-based, one-stop platform for all expat needs in Spain. We focus on housing and bureaucracy services with a vibrant community at its base.",
  openGraph: {
    type: "website",
    url: "https://sityex.com/",
    title: "SityEx | One-stop platform for expats",
    description:
      "SityEx is a community-based, one-stop platform for all expat needs in Spain. We focus on housing and bureaucracy services with a vibrant community at its base.",
    images: [
      "https://d1dshnpqadx0e7.cloudfront.net/logos/resized_big_logo_blue.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SityEx | One-stop platform for expats",
    description:
      "SityEx is a community-based, one-stop platform for all expat needs in Spain. We focus on housing and bureaucracy services with a vibrant community at its base.",
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
            <ShowBottomNavProvider>
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
                        xs: "100%",
                        md: `calc(100% - ${tabletDrawerWidth}px)`,
                        lg: `calc(100% - ${drawerWidth}px)`,
                      },
                    }}
                  >
                    <NavBarPlaceholder />
                    {children}
                  </Box>
                </Box>
              </ThemeRegistry>
            </ShowBottomNavProvider>
          </DrawerProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
