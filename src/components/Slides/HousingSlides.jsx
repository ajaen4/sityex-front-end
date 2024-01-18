"use client";

import React from "react";
import Carousel from "react-material-ui-carousel";

import HorizontalImages from "components/Slides/HorizontalImages";

const HousingSlides = ({ listing }) => {
  const horizontalImages = HorizontalImages(listing.images);

  const createSlides = (images) => {
    if (!images || images.length === 0) {
      return null;
    }

    return images.map((image, index) => (
      <img
        key={index}
        src={image.sizes["640x480"].link}
        style={{
          width: "300px",
          height: "200px",
        }}
      />
    ));
  };

  return (
    <Carousel
      sx={{ width: "100%", mx: 0 }}
      navButtonsAlwaysVisible
      indicators={false}
    >
      {createSlides(horizontalImages)}
    </Carousel>
  );
};

export default HousingSlides;
