import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { logAnalyticsEvent } from "api";

import { Box, Grid, Typography, Button, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import EventMap from "components/Maps/EventMap";
import EventCalendar from "components/Calendars/EventCalendar";

import { getCityEvent } from "actions";

const CityEventPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const selectedEvent = useSelector((state) => state.events.data.selectedEvent);
  const [imageHasError, setImageHasError] = useState(false);

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

  const imgSrc = imageHasError
    ? "https://sityex-public-images.s3.eu-west-1.amazonaws.com/square_big_logo_blue.png"
    : selectedEvent.photo_1;

  return (
    <Box
      sx={{
        overflowY: "scroll",
        mx: 1.5,
        mb: 2,
        p: 2,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 2
      }}
    >
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={11} md={3}>
          <img
            onError={() => setImageHasError(true)}
            srcSet={imgSrc}
            src={imgSrc}
            alt={selectedEvent.plan_name}
            loading="lazy"
            style={{ width: "100%", borderRadius: 6 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end"
          }}
        >
          {selectedEvent.availability_of_tickets === "low" && (
            <Chip
              label="Few tickets left"
              color="secondary"
              sx={{ mx: 2, py: 0.5 }}
            />
          )}
          <Typography variant="h2" sx={{ px: 2, py: 0.5 }}>
            {selectedEvent.plan_name}
          </Typography>
          <Typography variant="h4" sx={{ px: 2, py: 0.5 }}>
            {selectedEvent.venue}
          </Typography>
          <Typography variant="h5" sx={{ px: 2, py: 0.5 }}>
            {`Starting from: ${selectedEvent.minimum_price} ${selectedEvent.currency}`}
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
            justifyContent: "center",
            my: { xs: 2, md: 0, lg: 0 }
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              window.open(selectedEvent.affiliate_url, "_blank", "noopener")
            }
          >
            Buy tickets
          </Button>
        </Grid>
        <Grid item xs={11} md={8}>
          <Typography sx={{ pt: { xs: 1, md: 4, lg: 4 }, pb: 2, fontSize: 16 }}>
            {formatText(selectedEvent.description)}
          </Typography>
        </Grid>
        <Grid
          item
          md={3.5}
          sx={{
            display: { xs: "none", md: "flex" }
          }}
        >
          {selectedEvent.sessions && (
            <EventCalendar selectedEvent={selectedEvent} />
          )}
        </Grid>
        <Grid
          item
          xs={11}
          sx={{
            mt: 2,
            display: { xs: "flex", md: "none" },
            flexDirection: "column"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ fontSize: 25 }} />
            <Typography variant="h3" sx={{ fontSize: 22 }}>
              Dates
            </Typography>
          </Box>
          {selectedEvent.sessions && (
            <EventCalendar selectedEvent={selectedEvent} />
          )}
        </Grid>
        <Grid item xs={11.5} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ fontSize: 25 }} />
            <Typography variant="h3" sx={{ fontSize: 22 }}>
              Location
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ my: 1 }}>
            {selectedEvent.location}
          </Typography>
          <Box sx={{ width: "100%", height: 200 }}>
            <EventMap eventCoordinates={selectedEvent.coordinates} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CityEventPage;
