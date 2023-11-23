import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logAnalyticsEvent } from "api";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab
} from "@mui/material";

import DestinationsMap from "components/Maps/DestinationsMap";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";

const SearchPage = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);
  const [tab, setTab] = useState("search-box");

  const changeTab = (event, newValue) => {
    setTab(newValue);
  };

  const navigate = useNavigate();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Search Page",
      page_location: window.location.href,
      is_map_page: tab === "map" ? true : false
    });
  }, []);

  const onSelectCity = (event, value) => {
    if (value) navigate("/destination/" + value.city_id + "/events");
  };

  if (!citiesIndex) return <CenteredLoadingSpinner />;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        position: "relative"
      }}
    >
      {tab === "search-box" && (
        <Box
          style={{
            textAlign: "center",
            justifyContent: "center"
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center", my: 10 }}>
            <Grid item xs={11} md={5} lg={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h2" color="textSecondary" sx={{ mb: 3 }}>
                    Introduce a destination
                  </Typography>
                  <CitiesAutocomplete
                    citiesIndex={citiesIndex ? citiesIndex.cities : null}
                    onSelectCity={onSelectCity}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {tab === "map" && (
        <Box
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%"
          }}
        >
          <Suspense fallback={<CenteredLoadingSpinner />}>
            <DestinationsMap
              citiesIndex={citiesIndex ? citiesIndex.cities : []}
            />
          </Suspense>
        </Box>
      )}
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
          padding: "0.5rem"
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
