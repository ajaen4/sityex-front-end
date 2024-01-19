"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import { Box } from "@mui/material";

import SendGAPageView from "components/DataLoaders/SendGAPageView";
const HousingMap = dynamic(() => import("components/Maps/HousingMap"), {
  ssr: false,
});

import { fetchHousingIndex } from "actions";

const HousingPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    dispatch(fetchHousingIndex(selectedCity.city_id));
  }, [selectedCity.city_id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <SendGAPageView
        pageTitle="City Housing Page"
        selectedCity={{
          city_name: selectedCity.name,
          city_id: selectedCity.city_id,
        }}
      />
      <HousingMap />
    </Box>
  );
};

export default HousingPage;
