"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

const DestinationsMap = dynamic(
  () => import("components/Maps/DestinationsMap"),
  {
    ssr: false,
  },
);
import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitiesGrid from "components/ImageGrids/CitiesGrid";

import { minNavbarHeights } from "constants/constants";

const SearchPage = () => {
  const [tab, setTab] = useState("search-box");

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const windowHeight = "100vh";
  let windowInnerHeight = null;

  if (typeof window !== "undefined") {
    windowInnerHeight = window.innerHeight;
  }

  const height = !windowInnerHeight
    ? windowHeight
    : {
        xs: `${windowInnerHeight - minNavbarHeights.xs}px`,
        sm: `${windowInnerHeight - minNavbarHeights.sm}px`,
        md: `${windowInnerHeight - minNavbarHeights.md}px`,
        lg: `${windowInnerHeight - minNavbarHeights.lg}px`,
        xl: `${windowInnerHeight - minNavbarHeights.xl}px`,
      };

  return (
    <Box
      sx={{
        display: "flex",
        height: height,
        justifyContent: "center",
        position: "relative",
        overflowY: "scroll",
      }}
    >
      {tab === "search-box" && (
        <Grid
          container
          sx={{
            justifyContent: "center",
            mt: 10,
            width: "100%",
          }}
        >
          <Grid
            item
            xs={11}
            md={5}
            lg={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card elevation={0}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h1"
                  color="textSecondary"
                  sx={{ mb: 3, fontSize: 25 }}
                >
                  Introduce a destination
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                  }}
                >
                  <CitiesAutocomplete />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sx={{ height: "100%", mt: 5 }}>
            <Box
              sx={{
                height: "100%",
              }}
            >
              <CitiesGrid />
            </Box>
          </Grid>
        </Grid>
      )}
      {tab === "map" && <DestinationsMap />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 400,
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: 5,
          padding: "0.5rem",
        }}
      >
        <Tabs
          value={tab}
          onChange={changeTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Map or Search Box selector"
        >
          <Tab value="search-box" label="Search Box" />
          <Tab value="map" label="Map" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default SearchPage;
