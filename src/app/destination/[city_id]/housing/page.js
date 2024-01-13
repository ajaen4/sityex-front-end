"use client";

import React from "react";
import { useSelector } from "react-redux";

import { Container, Paper, Typography, Box } from "@mui/material";

import SendGAPageView from "components/DataLoaders/SendGAPageView";

const HousingPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" sx={{ my: 3 }}>
        Housing
      </Typography>
      <Container maxWidth="sm" sx={{ height: "100%" }}>
        <SendGAPageView
          pageTitle="City Housing Page"
          selectedCity={selectedCity}
        />
        <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            Housing for {selectedCity?.name} is in the works. Stay tuned!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HousingPage;
