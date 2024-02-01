"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
} from "@mui/material";

import SendGAPageView from "components/DataLoaders/SendGAPageView";
import HousingList from "components/Lists/HousingList";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
const HousingMap = dynamic(() => import("components/Maps/HousingMap"), {
  ssr: false,
});

import { fetchHousingIndex, orderHousingIndex } from "actions";

const HousingPage = () => {
  const [selectedView, setSelectedView] = useState("listings");
  const [sortBy, setSortBy] = useState("rank");
  const [pageNum, setPageNum] = useState(1);

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const housingIndex = useSelector((state) => state.housing.data);

  const dispatch = useDispatch();

  const changeTab = (event, newValue) => {
    setSelectedView(newValue);
  };

  const changeSortBy = (event, sortBy) => {
    setSortBy(sortBy);
    dispatch(orderHousingIndex(sortBy));
  };

  const changePage = (event, value) => {
    setPageNum(value);
  };

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    dispatch(fetchHousingIndex(selectedCity.city_id, sortBy));
  }, [selectedCity.city_id]);

  if (!housingIndex) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <SendGAPageView
        pageTitle="City Housing Page"
        selectedCity={{
          city_name: selectedCity.name,
          city_id: selectedCity.city_id,
        }}
      />
      {selectedView === "listings" && (
        <Box
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h1" sx={{ mt: 3, fontSize: 30 }}>
            Housing
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
              width: "100%",
              mt: 18,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: { xs: 1, md: 10 },
                mb: 1,
              }}
            >
              <Pagination
                count={10}
                siblingCount={0}
                boundaryCount={1}
                size="small"
                page={pageNum}
                onChange={changePage}
              />
              <Typography variant="h5" sx={{ mx: 1 }}>
                Order by:
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={sortBy}
                exclusive
                onChange={changeSortBy}
                aria-label="sortBy"
                size="small"
              >
                <ToggleButton value="rank">Rank</ToggleButton>
                <ToggleButton value="price">Price</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <HousingList pageNum={pageNum} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
              width: "100%",
              minHeight: { xs: 110, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: { xs: 1, md: 10 },
                mb: 1,
              }}
            >
              <Pagination
                count={10}
                siblingCount={0}
                boundaryCount={1}
                size="small"
                page={pageNum}
                onChange={changePage}
              />
              <Typography variant="h5" sx={{ mx: 1 }}>
                Order by:
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={sortBy}
                exclusive
                onChange={changeSortBy}
                aria-label="sortBy"
                size="small"
              >
                <ToggleButton value="rank">Rank</ToggleButton>
                <ToggleButton value="price">Price</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>
      )}
      {selectedView === "map" && <HousingMap />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: selectedView === "listings" ? "85px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 400,
          background: "rgba(255, 255, 255, 0.7)",
          borderRadius: 5,
          padding: "0.5rem",
        }}
      >
        <Tabs
          value={selectedView}
          onChange={changeTab}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="Listings or map selector"
        >
          <Tab value="listings" label="Listings" />
          <Tab value="map" label="Map" />
        </Tabs>
      </Box>
    </Box>
  );
};

export default HousingPage;
