"use client";

import React from "react";
import { useSelector } from "react-redux";

import { Box, useTheme, Paper, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { imagesCdn } from "constants/constants";

const CitySlides = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const slice = isSmallScreen ? 1 : 5;
  const createSlides = (cities) => {
    let slides = [];
    for (let i = 0; i < cities.length; i += slice) {
      slides.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
          }}
        >
          {cities.slice(i, i + slice).map((city) => (
            <Paper key={city.city_id} sx={{ flex: 1, m: 1 }}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                  backgroundImage: `url(${imagesCdn}/cities/${city.city_id}.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                alt={city.name}
                title={city.name}
              >
                <h2 style={{ color: "white" }}>{city.name}</h2>
              </Box>
            </Paper>
          ))}
        </Box>,
      );
    }
    return slides;
  };

  return (
    <Carousel
      sx={{ width: "100%", mt: 5 }}
      navButtonsAlwaysVisible
      indicators={false}
    >
      {citiesIndex?.cities && createSlides(citiesIndex.cities)}
    </Carousel>
  );
};

export default CitySlides;