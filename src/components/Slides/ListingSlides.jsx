import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

import { Box, CircularProgress } from "@mui/material";

const ListingSlides = ({ images, isInMap, imageHeight, autoPlay, swipe }) => {
  const carouselRef = React.useRef(null);

  useEffect(() => {
    const wrapper = carouselRef.current;

    if (wrapper && isInMap) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(wrapper);
    }
  }, []);

  const createSlides = (images) => {
    return images.images.map((image, index) => (
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
      {!images && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: imageHeight,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {images && (
        <Carousel
          navButtonsAlwaysVisible={images?.images}
          indicators={false}
          autoPlay={autoPlay}
          swipe={swipe ? true : false}
        >
          {createSlides(images)}
        </Carousel>
      )}
    </div>
  );
};

export default ListingSlides;
