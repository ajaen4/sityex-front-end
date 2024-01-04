"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { Box, Grid, Typography, Button, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import SendGAPageView from "components/DataLoaders/SendGAPageView";

const EventMap = dynamic(() => import("components/Maps/EventMap"), {
  ssr: false,
});
import EventCalendar from "components/Calendars/EventCalendar";

import { getCityEvent, setUserInterested } from "actions";

import { imagesCdn } from "constants/constants";

const CityEventPage = () => {
  const auth = useSelector((state) => state.auth);
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const selectedEvent = useSelector((state) => state.events.selectedEvent);
  const [imageHasError, setImageHasError] = useState(false);

  const { event_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.data) {
      return;
    }

    const interested_info = {
      is_interested: true,
    };

    setUserInterested(
      selectedCity.city_id,
      event_id,
      auth.data.id,
      interested_info,
    );
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

  const clickedBuyTickets = () => {
    const buy_info = {
      has_bought: true,
    };

    if (auth.data?.id)
      setUserInterested(
        selectedCity.city_id,
        event_id,
        auth.data?.id,
        buy_info,
      );
    window.open(selectedEvent.affiliate_url, "_blank", "noopener");
  };

  if (!selectedEvent) return null;

  const imgSrc = imageHasError
    ? `${imagesCdn}/logos/square_big_logo_blue.png`
    : selectedEvent.photo_1;

  return (
    <Box
      sx={{
        mx: 1.5,
        mb: 2,
        px: { xs: 2, md: 4 },
        py: 2,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <SendGAPageView pageTitle="City Event Page" event_id={event_id} />
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={3} lg={3}>
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
          md={7}
          lg={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
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
          lg={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            my: { xs: 2, md: 0, lg: 0 },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={clickedBuyTickets}
          >
            Buy tickets
          </Button>
        </Grid>
        <Grid item xs={12} md={7} lg={8} xl={9}>
          <Typography sx={{ pt: { xs: 1, md: 4, lg: 4 }, pb: 2, fontSize: 16 }}>
            {formatText(selectedEvent.description)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          xl={3}
          sx={{
            display: "flex",
            mt: { xs: 2 },
          }}
        >
          {selectedEvent.sessions &&
            !selectedEvent.plan_name
              .toLowerCase()
              .includes("tarjeta regalo") && (
              <EventCalendar selectedEvent={selectedEvent} />
            )}
        </Grid>
        {!(
          selectedEvent.coordinates.latitude === 0 &&
          selectedEvent.coordinates.longitude === 0
        ) && (
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex" }}>
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
        )}
      </Grid>
    </Box>
  );
};

export default CityEventPage;
