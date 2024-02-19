"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import { Tabs, Tab, Stack, Box, Typography } from "@mui/material";

const DestinationsMap = dynamic(() => import("components/Maps/DestinationsMap"), {
  ssr: false,
});
import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitiesGrid from "components/ImageGrids/CitiesGrid";

const SearchTab = () => {
  const [isOpenSearchTab, setIsOpenSearchTab] = useState("search-box");

  const changeTab = (event, newValue) => {
    setIsOpenSearchTab(newValue);
  };

  return (
    <>
      {isOpenSearchTab === "search-box" && (
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <CitiesGrid />
          </Box>
        </Stack>
      )}
      {isOpenSearchTab === "map" && <DestinationsMap />}
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
          value={isOpenSearchTab}
          onChange={changeTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Map or Search Box selector"
        >
          <Tab value="search-box" label="Search Box" />
          <Tab value="map" label="Map" />
        </Tabs>
      </Box>
    </>
  );
};

export default SearchTab;
