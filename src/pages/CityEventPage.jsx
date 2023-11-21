import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { logAnalyticsEvent } from "api";

import { Box, Grid, Typography, Button } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import { getCityEvent } from "actions";

const CityEventPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const selectedEvent = useSelector((state) => state.events.data.selectedEvent);

  const { event_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Event Page",
      page_location: window.location.href,
      city_name: selectedCity?.name,
      event_id: event_id
    });
  }, []);

  useEffect(() => {
    dispatch(getCityEvent(selectedCity.city_id, event_id));
  }, [event_id]);

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  if (!selectedEvent) return <CenteredLoadingSpinner />;

  return (
    <Box
      sx={{
        overflowY: "scroll",
        mx: 1,
        width: "90%",
        justifyContent: "center",
        backgroundColor: "white",
        p: 3,
        borderRadius: 2
      }}
    >
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={3}>
          <img
            srcSet={selectedEvent.photo_1}
            src={selectedEvent.photo_1}
            alt={selectedEvent.plan_name}
            loading="lazy"
            style={{ width: "100%", borderRadius: 6 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end"
          }}
        >
          <Typography variant="h2" sx={{ p: 2 }}>
            {selectedEvent.plan_name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.open(selectedEvent.affiliate_url)}
          >
            Buy tickets
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Typography sx={{ pt: 4, pb: 2, fontSize: 16 }}>
            {formatText(selectedEvent.description)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CityEventPage;
