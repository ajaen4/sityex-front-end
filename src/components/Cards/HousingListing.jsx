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

import { fetchListingImages } from "actions";
import { imagesCdn } from "constants/constants";
import { formatPrice } from "helpers/usefulFunctions";

import { postHogClient } from "analytics";

const HousingListing = ({ listing }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [images, setImages] = useState();

  const selectedCity = useSelector((state) => state.selectedCity.data);

  const maxDescriptionLength = isSmallScreen ? 200 : 250;
  const logoURL = `${imagesCdn}/partner_logos/${listing.partner}.png`;

  const getMinDescription = (description) => {
    if (description.length >= maxDescriptionLength) {
      return `${description.substring(0, maxDescriptionLength)}...`;
    } else {
      return description;
    }
  };

  useEffect(() => {
    fetchListingImages(selectedCity.city_id, listing.housing_id).then(
      (images) => {
        setImages(images);
      },
    );
  }, [listing, selectedCity.city_id]);

  const onClickListing = (link) => {
    postHogClient.capture("housing_listing_clicked", {
      housing_id: listing.housing_id,
      partner: listing.partner,
    });
    window.open(link, "_blank");
  };

  return (
    <Card
      id={listing.housing_id}
      onClick={() => onClickListing(listing.link)}
      key={listing.housing_id}
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
            images={images}
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
            <Grid container>
              <Grid
                item
                xs={7}
                md={8}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mt: 1,
                    mr: 1,
                    fontSize: 18,
                  }}
                >
                  {listing.title}
                </Typography>
                {listing.location.neighborhood && (
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      mr: 1,
                      fontSize: 18,
                    }}
                  >
                    {listing.location.neighborhood}
                  </Typography>
                )}
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mr: 1,
                      fontSize: 20,
                    }}
                  >
                    {formatPrice(listing.costsFormatted.price)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: 18 }}>
                    {listing.costsFormatted.pricing}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={5}
                md={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  height={listing.partner == "housing_anywhere" ? "42" : "27"}
                  src={logoURL}
                  alt="partner logo"
                  title="Partner logo"
                  style={{ marginTop: 10 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography variant="body1" sx={{ fontSize: 16 }}>
                {listing.kindLabel}{" "}
                {listing.typeLabel && `• ${listing.typeLabel}`}
                {listing.facilities?.totalSize &&
                  ` • ${listing.facilities.totalSize} m²`}
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
              {getMinDescription(listing.description)}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HousingListing;
