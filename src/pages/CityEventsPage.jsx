import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logAnalyticsEvent } from "api";

import { Box, Tabs, Tab } from "@mui/material";

import EventsList from "components/Events/eventsList";

import { getCityEvents } from "actions";

const eventCategories = [
  "Experiences",
  "Music",
  "Party",
  "Food & Drink",
  "Play",
  "Museums",
  "Courses",
  "Sport",
  "Fitness",
  "Games"
];

const CityEventsPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const events = useSelector((state) => state.events.data.events);
  const [selectedTab, setSelectedTab] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Events Page",
      page_location: window.location.href,
      city_name: selectedCity?.name
    });
  }, [selectedCity?.name]);

  useEffect(() => {
    dispatch(getCityEvents(selectedCity.city_id));
  }, [selectedCity]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const memoizedEvents = useMemo(() => {
    return eventCategories.map((category) =>
      events
        .filter((event) => event.sityex_subcategories.includes(category))
        .sort((a, b) => a.remaining_days - b.remaining_days)
    );
  }, [events]);

  return (
    <Box sx={{ overflowY: "scroll", my: 0.5, mx: 1.5 }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {eventCategories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
      {eventCategories.map(
        (category, index) =>
          selectedTab === index && (
            <EventsList events={memoizedEvents[index]} key={category} />
          )
      )}
    </Box>
  );
};

export default CityEventsPage;
