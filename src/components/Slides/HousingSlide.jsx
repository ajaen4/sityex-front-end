import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Paper, Typography } from "@mui/material";

import { fetchListingImages } from "actions";

const HousingSlide = ({ city_id, housing_id, title }) => {
  const [images, setImages] = useState(null);
  const router = useRouter();

  const handleListingClick = (city_id) => {
    router.push(`/services/${city_id}/housing`);
  };

  useEffect(() => {
    fetchListingImages(city_id, housing_id).then((images) => {
      setImages(images);
    });
  }, [city_id, housing_id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 1,
        width: "100%",
      }}
    >
      <Paper>
        <Box
          sx={{
            borderRadius: 2,
            width: "100%",
            height: { xs: "50vh", md: "47vh" },
            backgroundImage: images
              ? `url(${images.images[0].sizes["640x480"].link})`
              : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
          }}
          onClick={() => handleListingClick(city_id)}
        />
      </Paper>
      <Typography
        variant="h4"
        sx={{
          my: 1,
          fontSize: 16,
          minHeight: { xs: "5vh", md: "7vh" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default HousingSlide;
