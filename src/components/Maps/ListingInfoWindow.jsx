"use client";

import React, { useRef, useEffect } from "react";

import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import HousingSlides from "components/Slides/HousingSlides";

const ListingInfoWindow = ({ listing, setSelectedListing }) => {
  const cardRef = useRef(null);

  const navigate = (link) => {
    window.open(link.replace("/es/", "/en/"), "_blank");
  };

  useEffect(() => {
    if (cardRef?.current) {
      const disableClickPropagation = L?.DomEvent?.disableClickPropagation;
      disableClickPropagation(cardRef.current);
    }
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
      onClick={() => navigate(listing.localizedLinks.es)}
      key={listing.housing_id}
      href={listing.originalLink}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 1000,
        p: 0,
        width: 300,
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
      <HousingSlides listing={listing} />
        <CardContent
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            px: 2,
            py: 1,
            textAlign: "left",
          }}
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
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <Typography variant="body1">
              {listing.kindLabel} • {listing.typeLabel} •{" "}
              {listing.facilities.totalSize &&
                listing.facilities.totalSize.value}{" "}
              m²
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
