import React from "react";

import { Box } from "@mui/material";

import Navbar from "components/Navigation/Navbar";
import Drawer from "components/Navigation/Drawer";
import StoreProvider from "./StoreProvider";
import DataLoader from "components/DataLoaders/DataLoader";
import { DrawerProvider } from "components/Contexts/DrawerContext";
import { ShowSignUpProvider } from "components/Contexts/ShowSignUpContext";
import { ShowBotNavProvider } from "components/Contexts/ShowBotNavContext";

import ThemeRegistry from "theme/ThemeRegistry";

import "./globals.css";

import { minNavbarHeight } from "constants/constants";

export const viewport = {
  themeColor: "#2196f3",
};

export const metadata = {
  generator: "SityEx",
  applicationName: "SityEx",
  creator: "Alberto Jaen",
  manifest: "https://sityex.com/manifest.json",
  title: {
    default: "SityEx | One-stop platform for young expats",
  },
  description:
    "One-stop platform for all expat needs in Madrid. We focus on housing and paperwork services with a vibrant community at its base.",
  openGraph: {
    type: "website",
    url: "https://sityex.com/",
    title: "SityEx | One-stop platform for young expats",
    description:
      "One-stop platform for all expat needs in Madrid. We focus on housing and paperwork services with a vibrant community at its base.",
    images: [
      "https://d1dshnpqadx0e7.cloudfront.net/images/logos/small_blue_high_res.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SityEx | One-stop platform for young expats",
    description:
      "One-stop platform for all expat needs in Madrid. We focus on housing and paperwork services with a vibrant community at its base.",
    images: [
      "https://d1dshnpqadx0e7.cloudfront.net/images/logos/small_blue_high_res.png",
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
            <ShowBotNavProvider>
              <ShowSignUpProvider>
                <ThemeRegistry options={{ key: "mui-theme" }}>
                  <DataLoader />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Navbar />
                    <Box
                      sx={{
                        display: "flex",
                        height: {
                          xs: `calc(100% - ${minNavbarHeight.xs})`,
                          sm: `calc(100% - ${minNavbarHeight.sm})`,
                          md: `calc(100% - ${minNavbarHeight.md})`,
                          lg: `calc(100% - ${minNavbarHeight.lg})`,
                          xl: `calc(100% - ${minNavbarHeight.xl})`,
                        },
                      }}
                    >
                      <Drawer />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          overflowY: "auto",
                        }}
                      >
                        {children}
                      </Box>
                    </Box>
                  </Box>
                </ThemeRegistry>
              </ShowSignUpProvider>
            </ShowBotNavProvider>
          </DrawerProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
