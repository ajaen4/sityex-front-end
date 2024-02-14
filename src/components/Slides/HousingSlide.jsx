import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Paper, Typography } from "@mui/material";

import { fetchHousingListing } from "actions";

const HousingSlide = ({ city_id, housing_id }) => {
  const [listing, setListing] = useState(null);
  const router = useRouter();

  const handleListingClick = (city_id) => {
    router.push(`/destination/${city_id}/housing`);
  };

  useEffect(() => {
    fetchHousingListing(city_id, housing_id).then((listing) => {
      setListing(listing);
    });
  }, []);

  if (!listing) {
    return null;
  }

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
            height: { xs: "55vh", md: "53vh" },
            backgroundImage: `url(${listing.images[0].sizes["640x480"].link})`,
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
        {listing.title}
      </Typography>
    </Box>
  );
};

export default HousingSlide;
