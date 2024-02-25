"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, useTheme, Paper, useMediaQuery, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { imagesCdn } from "constants/constants";

const paperworkServices = [
  {
    name: "NIE",
    image: "nie.png",
    path: "/services/3117735/paperwork?tab=essentials",
  },
  {
    name: "Empadronamiento",
    image: "empadronamiento.png",
    path: "/services/3117735/paperwork?tab=essentials",
  },
  {
    name: "Social Security",
    image: "seguridad-social.png",
    path: "/services/3117735/paperwork?tab=essentials",
  },
  {
    name: "Health Card",
    image: "tarjeta-sanitaria.png",
    path: "/services/3117735/paperwork?tab=essentials",
  },
  {
    name: "Taxes",
    image: "taxes.png",
    path: "/services/3117735/paperwork?tab=tax-declaration",
  },
  {
    name: "Drivers License Exchange",
    image: "drivers-license.png",
    path: "/services/3117735/paperwork?tab=driver-vehicle-licensing",
  },
  {
    name: "Vehicle Licensing",
    image: "vehicle-licensing.png",
    path: "/services/3117735/paperwork?tab=driver-vehicle-licensing",
  },
];

const PaperworkSlides = () => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const slice = isSmallScreen ? 1 : 5;

  const createSlides = () => {
    let slides = [];
    const totalItemsNeeded =
      Math.ceil(paperworkServices.length / slice) * slice;
    for (let i = 0; i < totalItemsNeeded; i += slice) {
      let itemsForCurrentSlide = [];
      for (let j = 0; j < slice; j++) {
        const currentItemIndex = (i + j) % paperworkServices.length;
        itemsForCurrentSlide.push(paperworkServices[currentItemIndex]);
      }

      slides.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {itemsForCurrentSlide.map((service) => (
            <Box
              key={service.name}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 1,
                width: "100%",
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25vh",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <Link
                  href={service.path}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`${imagesCdn}/icons/${service.image}`}
                    alt={service.name}
                    style={{ height: "75%" }}
                  />
                </Link>
              </Paper>
              <Typography
                variant="h4"
                sx={{
                  my: 1,
                  fontSize: 16,
                  minHeight: "5vh",
                }}
              >
                {service.name}
              </Typography>
            </Box>
          ))}
        </Box>,
      );
    }
    return slides;
  };

  return (
    <Carousel navButtonsAlwaysVisible indicators={false} interval={7000}>
      {createSlides()}
    </Carousel>
  );
};

export default PaperworkSlides;
