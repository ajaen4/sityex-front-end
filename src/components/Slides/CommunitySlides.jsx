"use client";
import React from "react";

import { Grid, Box, Typography, Button, Paper } from "@mui/material";

import { imagesCdn } from "constants/constants";

const CommunitySlides = () => {
  return (
    <Grid
      container
      sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
      <Grid item xs={12} md={3}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            maxWidth: 300,
            m: 2,
          }}
        >
          <img
            width="150"
            height="80"
            src={`${imagesCdn}/partner_logos/meetup.png`}
            alt="meetup icon"
            title="Meetup icon"
          />
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontSize: 16 }}
          >
            Join Us in Meetup
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16, my: 1 }} gutterBottom>
            New in town or looking to meet like-minded expats? Discover our
            community on Meetup!
          </Typography>
          <Button
            variant="contained"
            sx={{
              alignSelf: "center",
              my: 2,
            }}
            onClick={() =>
              window.open(
                "https://www.meetup.com/sityex-madrid-community-expats/",
              )
            }
          >
            Join through link
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            maxWidth: 300,
            m: 2,
          }}
        >
          <img
            height="60"
            src={`${imagesCdn}/partner_logos/instagram.webp`}
            alt="instagram icon"
            title="Instagram icon"
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontSize: 16 }}
          >
            Join Us in Instagram
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 16, my: 1 }} gutterBottom>
            New in town or looking to meet like-minded expats? Discover our
            community on Meetup!
          </Typography>
          <Button
            variant="contained"
            sx={{
              alignSelf: "center",
              my: 2,
            }}
            onClick={() =>
              window.open(
                "https://www.instagram.com/sityex.official/",
              )
            }
          >
            Join through link
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CommunitySlides;
