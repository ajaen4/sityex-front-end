"use client";

import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ListingSlides from "components/Slides/ListingSlides";

import { fetchListingImages } from "actions";
import { imagesCdn } from "constants/constants";

const ListingInfoWindow = ({ listing, setSelectedListing }) => {
  const cardRef = useRef(null);

  const [images, setImages] = useState();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  useEffect(() => {
    if (cardRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(cardRef.current);
    }

    fetchListingImages(selectedCity.city_id, listing.housing_id).then(
      (images) => {
        setImages(images);
      },
    );
  }, [listing]);

  const formatPrice = (price) => {
    const number = parseFloat(price.replace(/,/g, ""));
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedListing(null);
  };

  return (
    <Card
      ref={cardRef}
      id={listing.housing_id}
      onClick={() => window.open(listing.originalLink, "_blank")}
      key={listing.housing_id}
      href={listing.originalLink}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 15,
        right: 10,
        zIndex: 1000,
        p: 0,
        width: { xs: 330, md: 380 },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 100,
          color: "black",
          backgroundColor: "white",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <ListingSlides
        images={images}
        isInMap={true}
        imageHeight={"200px"}
        autoPlay={true}
        swipe={true}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          px: 2,
          py: 1,
          textAlign: "left",
        }}
      >
        <Grid container sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <Grid
            item
            xs={7}
            md={8}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mr: 1,
                  fontSize: 18,
                }}
              >
                {formatPrice(listing.costsFormatted.price)}
              </Typography>
              <Typography variant="body1">
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
              width="100"
              height="30"
              src={`${imagesCdn}/partner_logos/housing_anywhere.png`}
              alt="housinganywhere icon"
              title="HousingAnywhere"
              style={{ marginTop: 3 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            {listing.kindLabel} • {listing.typeLabel}
            {listing.facilities.totalSize &&
              `• ${listing.facilities.totalSize.value} m²`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          <Typography variant="body1">
            Available from {formatDate(listing.available[0]["from"])}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ListingInfoWindow;
