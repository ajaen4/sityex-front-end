import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";

const SearchPage = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);
  const navigate = useNavigate();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Search Page",
      page_location: window.location.href
    });
  }, []);

  const onChangeCity = (event, value) => {
    navigate("/destination/" + value.city_id + "/info");
  };

  if (!citiesIndex) return <CenteredLoadingSpinner />;

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center"
      }}
    >
      <Grid container spacing={1} sx={{ justifyContent: "center", my: 5 }}>
        <Grid item xs={11} md={5} lg={4}>
          <Card elevation={0} >
            <CardContent>
              <Typography variant="h2" color="textSecondary" sx={{ mb: 3 }}>
                Introduce a destination
              </Typography>
              <CitiesAutocomplete
                citiesIndex={citiesIndex ? citiesIndex.cities : null}
                onChangeCity={onChangeCity}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(SearchPage);
