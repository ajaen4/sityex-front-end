"use client";

import React from "react";
import { useSelector } from "react-redux";

import { Container, Paper, Typography, Box } from "@mui/material";

import SendGAPageView from "components/DataLoaders/SendGAPageView";

const BureaucracyPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ height: "100%" }}>
        <SendGAPageView
          pageTitle="City Bureaucracy Page"
          selectedCity={selectedCity}
        />
        <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
            Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            Bureaucracy for {selectedCity?.name} is in the works. Stay tuned!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default BureaucracyPage;
