"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";

import EventsGrid from "components/ImageGrids/EventsGrid";

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
  "Games",
  "Other",
];

const CityEventsPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const events = useSelector((state) => state.events.events);
  const [selectedTab, setSelectedTab] = useState(0);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

    events.forEach((event) => {
      const subcategories = event.sityex_subcategories
        .split(",")
        .map((subcategory) => subcategory.trim());
      subcategories.forEach((subcategory) => {
        usedSubcategories.add(subcategory);
      });
    });

    return eventCategories.filter((subcategory) =>
      usedSubcategories.has(subcategory),
    );
  }, [events]);

  const memoizedEvents = useMemo(() => {
    return filteredSubcategories.map((category) =>
      events
        .filter((event) => event.sityex_subcategories.includes(category))
        .sort((a, b) => a.remaining_days - b.remaining_days),
    );
  }, [events, filteredSubcategories]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons="auto"
        centered={!isSmallScreen}
        xs={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        {filteredSubcategories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
      <Box sx={{ overflowY: "scroll", width: "100%", height: "100%", pb: 6 }}>
        {filteredSubcategories.map(
          (category, index) =>
            selectedTab === index && (
              <EventsGrid key={category} events={memoizedEvents[index]} />
            ),
        )}
      </Box>
    </Box>
  );
};

export default CityEventsPage;
