"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";

import EventsGrid from "components/ImageGrids/EventsGrid";
import MultipleSelect from "components/Selects/MultipleSelect";

import { getCityEvents, updateEventsOrderBy } from "actions";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import SendGAPageView from "components/DataLoaders/SendGAPageView";

const CityEventsPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const eventsState = useSelector((state) => state.events);
  const orderBy = useSelector((state) => state.events.data.orderBy);
  const [selectedTab, setSelectedTab] = useState(0);

  const usedSubcategories = eventsState.data.usedSubcategories;

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCity) {
      dispatch(getCityEvents(selectedCity.city_id));
    }
  }, [dispatch, selectedCity]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const changeOrderBy = (event) => {
    const value = event.target.value;
    dispatch(updateEventsOrderBy(value));
  };

  if (eventsState.city_id !== selectedCity.city_id) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexGrow: 1,
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <SendGAPageView
        pageTitle="City Events Page"
        selectedCity={{
          city_name: selectedCity.name,
          city_id: selectedCity.city_id,
        }}
      />
      <Typography variant="h1" sx={{ my: 3, fontSize: 30 }}>
        Events
      </Typography>
      <Box>
        <FormControl sx={{ width: 140 }}>
          <InputLabel id="order-by">Order By</InputLabel>
          <Select
            value={orderBy}
            onChange={changeOrderBy}
            input={<OutlinedInput label="Order By" />}
          >
            <MenuItem key="closest-date" value="closest-date">
              Closest date
            </MenuItem>
            <MenuItem key="low-price" value="low-price">
              Lowest price
            </MenuItem>
            <MenuItem key="high-price" value="high-price">
              Highest price
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
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
        {[...usedSubcategories].map((category) => (
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
        {[...usedSubcategories].map(
          (category, index) =>
            selectedTab === index && (
              <EventsGrid
                key={category}
                events={eventsState.data.groupedEvents[index]}
              />
            )
        )}
      </Box>
    </Box>
  );
};

export default CityEventsPage;
