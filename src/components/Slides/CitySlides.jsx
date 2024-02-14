"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { Box, useTheme, Paper, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { imagesCdn } from "constants/constants";

const CitySlides = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const slice = isSmallScreen ? 1 : 5;

  const handleCityClick = (city_id) => {
    router.push(`/destination/${city_id}`);
  };

  const createSlides = (cities) => {
    let slides = [];
    const totalSlides = Math.ceil(cities.length / slice);
    for (let slide = 0; slide < totalSlides; slide++) {
      let slideCities = [];
      for (let i = 0; i < slice; i++) {
        const cityIndex = (slide * slice + i) % cities.length;
        slideCities.push(cities[cityIndex]);
      }
      slides.push(
        <Box
          key={slide}
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
          }}
        >
          {slideCities.map((city) => (
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
                  cursor: "pointer",
                }}
                onClick={() => handleCityClick(city.city_id)}
                alt={city.name}
                title={city.name}
              >
                <h2 style={{ color: "white" }}>{city.name}</h2>
              </Box>
            </Paper>
          ))}
        </Box>
      );
    }
    return slides;
  };

  return (
    <Carousel
      navButtonsAlwaysVisible
      indicators={false}
      interval={7000}
    >
      {citiesIndex?.cities && createSlides(citiesIndex.cities)}
    </Carousel>
  );
};

export default CitySlides;
