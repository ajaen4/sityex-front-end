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
  Stack,
} from "@mui/material";

const DestinationsMap = dynamic(
  () => import("components/Maps/DestinationsMap"),
  {
    ssr: false,
  }
);
import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitiesGrid from "components/ImageGrids/CitiesGrid";

import { contentHeight } from "constants/constants";

export const metadata = {
  title: "SityEx | City Search",
  description: "Discover Your Ideal Spanish City from our 27 available cities.",
};

const SearchPage = () => {
  const [tab, setTab] = useState("search-box");

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: contentHeight,
        justifyContent: "center",
        position: "relative",
        overflowY: "scroll",
      }}
    >
      {tab === "search-box" && (
        <Stack
          sx={{
            display: "flex",
            width: "100%",
            mt: 10,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            color="textSecondary"
            sx={{ my: 2, fontSize: 25 }}
          >
            Introduce a destination
          </Typography>
          <Box
            sx={{
              width: { xs: "60%", md: "20%", lg: "20%", xl: "15%" },
              mt: 2,
              mb: 5,
            }}
          >
            <CitiesAutocomplete />
          </Box>
          <Box sx={{ width: "100%", height: "100%" }}>
            <CitiesGrid />
          </Box>
        </Stack>
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
