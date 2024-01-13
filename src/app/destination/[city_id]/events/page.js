"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Tabs, Tab, Typography } from "@mui/material";

import EventsGrid from "components/ImageGrids/EventsGrid";

import { getCityEvents } from "actions";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import SendGAPageView from "components/DataLoaders/SendGAPageView";

const eventCategories = [
  "Exclusive events",
  "Experiences",
  "Music",
  "Party",
  "Food & Drinks",
  "Play",
  "Cinema",
  "Museums",
  "Courses",
  "Sport",
  "Fitness",
  "Games",
  "Other",
];

const CityEventsPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const events = useSelector((state) => state.events);
  const [selectedTab, setSelectedTab] = useState(0);

  const dispatch = useDispatch();

  const eventsData = events.events || [];

  useEffect(() => {
    if (selectedCity) {
      dispatch(getCityEvents(selectedCity.city_id));
    }
  }, [selectedCity]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredSubcategories = useMemo(() => {
    const usedSubcategories = new Set();

    eventsData.forEach((event) => {
      const subcategories = event.sityex_subcategories
        .split(",")
        .map((subcategory) => subcategory.trim());
      subcategories.forEach((subcategory) => {
        usedSubcategories.add(subcategory);
      });
    });

    return eventCategories.filter((subcategory) =>
      usedSubcategories.has(subcategory)
    );
  }, [events]);

  const memoizedEvents = useMemo(() => {
    return filteredSubcategories.map((category) =>
      eventsData
        .filter((event) => event.sityex_subcategories.includes(category))
        .sort((a, b) => a.remaining_days - b.remaining_days)
    );
  }, [events, filteredSubcategories]);

  if (events.city_id !== selectedCity.city_id) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        flexGrow: 1,
        textAlign: "center",
      }}
    >
      <SendGAPageView
        pageTitle="City Events Page"
        selectedCity={selectedCity}
      />
      <Typography variant="h1" sx={{ my: 3 }}>
        Events
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        xs={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: 0,
        }}
      >
        {filteredSubcategories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {filteredSubcategories.map(
          (category, index) =>
            selectedTab === index && (
              <EventsGrid key={category} events={memoizedEvents[index]} />
            )
        )}
      </Box>
    </Box>
  );
};

export default CityEventsPage;
