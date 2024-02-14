"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
} from "@mui/material";

import ListingSlides from "components/Slides/ListingSlides";

import { fetchHousingListing } from "actions";

const HousingListing = ({ listing }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [fullData, setFullData] = useState(null);

  const maxDescriptionLength = isSmallScreen ? 200 : 250;

  const getMinDescription = (description) => {
    if (description.length >= maxDescriptionLength) {
      return `${description.substring(0, maxDescriptionLength)}...`;
    } else {
      return description;
    }
  };

  const formatPrice = (price) => {
    const number = parseFloat(price.replace(/,/g, ""));
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number);
  };

  useEffect(() => {
    fetchHousingListing(selectedCity.city_id, listing.housing_id).then(
      (response) => {
        setFullData(response);
      },
    );
  }, []);

  if (!fullData) {
    return null;
  }

  return (
    <Card
      id={fullData.housing_id}
      onClick={() => window.open(fullData.originalLink, "_blank")}
      key={fullData.housing_id}
      href={fullData.originalLink}
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "95%",
        m: 1,
      }}
    >
      <Grid container>
        <Grid item xs={12} md={4}>
          <ListingSlides
            listing={fullData}
            imageHeight={isSmallScreen ? "200px" : "240px"}
            autoPlay={false}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              px: 2,
              py: 1,
              textAlign: "left",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mt: 1,
                mr: 1,
                fontSize: 18,
              }}
            >
              {fullData.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                mr: 1,
                fontSize: 18,
              }}
            >
              {fullData.location.neighborhood}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mr: 1,
                  fontSize: 20,
                }}
              >
                {formatPrice(fullData.costsFormatted.price)}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 18 }}>
                {fullData.costsFormatted.pricing}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography variant="body1" sx={{ fontSize: 16 }}>
                {fullData.kindLabel} • {fullData.typeLabel}
                {fullData.facilities.totalSize &&
                  ` • ${fullData.facilities.totalSize.value} m²`}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                height: isSmallScreen ? "200px" : "85px",
                overflow: "hidden",
                fontSize: 16,
              }}
            >
              {getMinDescription(fullData.description)}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HousingListing;
