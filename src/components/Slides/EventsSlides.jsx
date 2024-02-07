"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Box, useTheme, useMediaQuery, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import * as api from "api";

const EventsSlides = () => {
  const [events, setEvents] = useState([]);

  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const slice = isSmallScreen ? 1 : 5;
  const city_id = "3117735";

  useEffect(() => {
    api.getCityTrendingEvents(city_id).then((events) => {
      setEvents(events.slice(0, 20));
    });
  }, []);

  const handleEventClick = (city_id, event_id) => {
    router.push(`/destination/${city_id}/event/${event_id}`);
  };

  const createSlides = (events) => {
    let slides = [];
    for (let i = 0; i < events.length; i += slice) {
      slides.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {events.slice(i, i + slice).map((event) => (
            <Box
              key={event.event_id}
              sx={{
                display: "flex",
                flexDirection: "column",
                m: 1,
                width: "100%",
              }}
            >
              <Paper>
                <Box
                  sx={{
                    borderRadius: 2,
                    width: "100%",
                    height: "52vh",
                    backgroundImage: `url(${event.photo_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEventClick(city_id, event.event_id)}
                />
              </Paper>
              <Typography
                variant="h4"
                sx={{
                  my: 1,
                  fontSize: 16,
                  minHeight: "8vh",
                }}
              >
                {event.plan_name_en}
              </Typography>
            </Box>
          ))}
        </Box>,
      );
    }
    return slides;
  };

  return (
    <Carousel
      sx={{ width: "100%" }}
      navButtonsAlwaysVisible
      indicators={false}
      interval={7000}
    >
      {createSlides(events)}
    </Carousel>
  );
};

export default EventsSlides;
