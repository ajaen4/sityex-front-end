import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logAnalyticsEvent } from "api";

import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";

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
  }, []);

  useEffect(() => {
    dispatch(getCityEvents(selectedCity.city_id));
  }, [selectedCity]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filterEvents = (category) => {
    return events.filter((event) =>
      event.sityex_subcategories.includes(category)
    )
    .sort((a, b) => a.remaining_days - b.remaining_days);
  }

  return (
    <Box sx={{ overflowY: "scroll", my: 0.5, mx: 1.5 }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        centered
      >
        {eventCategories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
        {selectedTab === 0 && <EventsList events={filterEvents(eventCategories[0])} />}
        {selectedTab === 1 && <EventsList events={filterEvents(eventCategories[1])} />}
        {selectedTab === 2 && <EventsList events={filterEvents(eventCategories[2])} />}
        {selectedTab === 3 && <EventsList events={filterEvents(eventCategories[3])} />}
        {selectedTab === 4 && <EventsList events={filterEvents(eventCategories[4])} />}
        {selectedTab === 5 && <EventsList events={filterEvents(eventCategories[5])} />}
        {selectedTab === 6 && <EventsList events={filterEvents(eventCategories[6])} />}
        {selectedTab === 7 && <EventsList events={filterEvents(eventCategories[7])} />}
        {selectedTab === 8 && <EventsList events={filterEvents(eventCategories[8])} />}
        {selectedTab === 9 && <EventsList events={filterEvents(eventCategories[9])} />}
    </Box>
  );
};

export default CityEventsPage;
