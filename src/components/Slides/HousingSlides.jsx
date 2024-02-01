import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import { Box } from "@mui/material";

const HousingSlides = ({ listing, isInMap, imageHeight, autoPlay, swipe }) => {
  const carouselRef = React.useRef(null);

  useEffect(() => {
    const wrapper = carouselRef.current;

    if (wrapper && isInMap) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(wrapper);
    }
  }, []);

  const createSlides = (images) => {
    if (!images || images.length === 0) {
      return null;
    }

    return images.map((image, index) => (
      <Box
        key={index}
        sx={{
          width: "100%",
          height: imageHeight,
          backgroundImage: `url(${image.sizes["640x480"].link})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    ));
  };

  return (
    <div ref={carouselRef}>
      {listing.images && (
        <Carousel
          navButtonsAlwaysVisible={listing.images.length > 1}
          indicators={false}
          autoPlay={autoPlay}
          swipe={swipe ? true : false}
        >
          {createSlides(listing.images)}
        </Carousel>
      )}
    </div>
  );
};

export default HousingSlides;
