"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { Box, Grid, Typography, Button, Card } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const EventMap = dynamic(() => import("components/Maps/EventMap"), {
  ssr: false,
});

import { getCityEvent } from "actions";

import { imagesCdn } from "constants/constants";

const CityEventPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const selectedEvent = useSelector((state) => state.events.data.selectedEvent);
  const [imageHasError, setImageHasError] = useState(false);

  const eventDate = new Date(selectedEvent?.timestamp);

  const { event_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCityEvent(selectedCity.city_id, event_id));
  }, [dispatch, selectedCity.city_id, event_id]);

  const clickedRSVP = () => {
    window.open(selectedEvent.event_url, "_blank", "noopener");
  };

  const formatDate = () => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Europe/Madrid",
    };
    const formattedDate = new Intl.DateTimeFormat("en-ES", options).format(
      eventDate
    );

    return formattedDate.replace(",", "").toUpperCase();
  };

  if (!selectedEvent) return <CenteredLoadingSpinner />;

  const plan_name = selectedEvent.title;
  let imgSrc = selectedEvent.image_url;

  if (imageHasError) {
    imgSrc = `${imagesCdn}/logos/square_black_big_logo_blue.png`;
  }

  if (selectedEvent.event_id !== event_id) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <Box
      sx={{
        mx: 1.5,
        my: 2,
        px: { xs: 2, md: 4 },
        py: 2,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Grid container sx={{ display: "flex", justifyContent: "start" }}>
        <Grid item xs={12} md={5} lg={5}>
          <img
            onError={() => setImageHasError(true)}
            srcSet={imgSrc}
            src={imgSrc}
            alt={plan_name}
            loading="lazy"
            style={{ width: "100%", borderRadius: 6 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="h2" sx={{ px: { md: 2 }, py: 0.5 }}>
            {plan_name}
          </Typography>
          <Typography variant="h4" sx={{ px: { md: 2 }, py: 0.5 }}>
            {selectedEvent.venue_name}
          </Typography>
          <Typography variant="h4" sx={{ px: { md: 2 }, py: 0.5 }}>
            {formatDate()}
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
          {eventDate >= new Date() && (
            <Button variant="contained" color="primary" onClick={clickedRSVP}>
              RSVP
            </Button>
          )}
          {eventDate < new Date() && (
            <Card
              sx={{
                background: "#cdd5df",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                p: 2,
              }}
            >
              Past event
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={8} lg={9} xl={9}>
          <Typography
            sx={{ pt: { xs: 1, md: 4, lg: 4 }, pb: 2, fontSize: 16 }}
            dangerouslySetInnerHTML={{
              __html: selectedEvent.description_html,
            }}
          />
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
        ></Grid>
        {!(selectedEvent.latitude === 0 && selectedEvent.longitude === 0) && (
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
              <EventMap
                eventCoordinates={[
                  selectedEvent.latitude,
                  selectedEvent.longitude,
                ]}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CityEventPage;
