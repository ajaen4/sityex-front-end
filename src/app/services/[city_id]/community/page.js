"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Typography, Box } from "@mui/material";

import EventsGrid from "components/ImageGrids/EventsGrid";

import { getCityEvents } from "actions";

const CommunityPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const events = useSelector((state) => state.events.data.events);

  const router = useRouter();

  const today = new Date();
  const currEvents = events.filter((event) => {
    return new Date(event.timestamp) >= today;
  });
  const pastEvents = events.filter((event) => {
    return new Date(event.timestamp) < today;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCity) {
      dispatch(getCityEvents(selectedCity.city_id));
    }
  }, [dispatch, selectedCity]);

  const handleEventClick = (eventId) => {
    router.push(`/services/${selectedCity.city_id}/event/${eventId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography variant="h1" sx={{ mt: { xs: 2, md: 3 }, fontSize: 30 }}>
        Community
      </Typography>
      <Box
        sx={{
          m: 3,
          backgroundColor: "white",
          p: 3,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Typography variant="body" sx={{ mt: 3, fontSize: 16 }}>
          🔀 Welcome to the SityEx community! <br />
          <br />
          🗣️ This group is for all young expats eager to meet people! If you
          feel like devouring Madrid, you are invited to join us!
          <br />
          <br />
          🎯 Our goal is to integrate 100% of expatriates into the city.
          <br />
          <br />
          💆‍♂️ SityEx is a platform focused on making life easier for expats in
          Madrid. <br />
          <br />
          😉 Don&apos;t be shy and take the leap!
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ mb: { xs: 2, md: 3 }, fontSize: 25 }}>
        Upcoming events
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "100%",
        }}
      >
        {currEvents.length === 0 && (
          <Box
            sx={{
              backgroundColor: "white",
              p: 3,
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <Typography variant="body" sx={{ mb: 2, fontSize: 16 }}>
              No current events
            </Typography>
          </Box>
        )}
        {currEvents.length !== 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: 230,
            }}
          >
            <EventsGrid events={currEvents} />
          </Box>
        )}
      </Box>
      <Typography variant="h3" sx={{ my: { xs: 2, md: 3 }, fontSize: 25 }}>
        Past events
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: 100,
        }}
      >
        <EventsGrid events={pastEvents} />
      </Box>
    </Box>
  );
};

export default CommunityPage;
