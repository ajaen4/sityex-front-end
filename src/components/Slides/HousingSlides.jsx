"use client";

import React, { useEffect, useState } from "react";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import HousingSlide from "components/Slides/HousingSlide";

import * as api from "api";

const HousingSlides = ({}) => {
  const [listings, setListings] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const slice = isSmallScreen ? 1 : 5;
  const city_id = "3117735";

  useEffect(() => {
    api.getHousingIndex(city_id).then((response) => {
      setListings(response.listings.slice(0, 30));
    });
  }, []);

  const createSlides = (listings) => {
    let slides = [];
    for (let i = 0; i < listings.length; i += slice) {
      slides.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {listings.slice(i, i + slice).map((listing) => (
            <HousingSlide
              key={listing.housing_id}
              city_id={city_id}
              housing_id={listing.housing_id}
            />
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
      {createSlides(listings)}
    </Carousel>
  );
};

export default HousingSlides;
