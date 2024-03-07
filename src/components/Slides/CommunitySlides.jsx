"use client";
import React from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";

import { Grid, Typography, Button, Paper, Box } from "@mui/material";

import "@vidstack/react/player/styles/base.css";

import { imagesCdn } from "constants/constants";

const CommunitySlides = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        my: 4,
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "end" },
          alignItems: "center",
          pr: { md: 5 },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "65%", lg: "55%", xl: "45%" } }}>
          <MediaPlayer
            title="Community video"
            src={`${imagesCdn}/video/community.mp4`}
            aspectRatio="0.55"
            style={{ width: "100%" }}
            controls
            playsInline
          >
            <MediaProvider>
              <Poster
                src={`${imagesCdn}/video/video-thumbnail.jpeg`}
                alt="SityEx"
              />
            </MediaProvider>
          </MediaPlayer>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pl: { md: 5 },
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "start" },
          }}
        >
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                maxWidth: 300,
                mx: 2,
                mt: { xs: 2, md: 0 },
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
                Join Us on Meetup
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: 16, my: 1 }}
                gutterBottom
              >
                Here is where we post our upcoming events!
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
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                maxWidth: 300,
                mx: 2,
                mt: 2,
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
                Join Us on Instagram
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: 16, my: 1 }}
                gutterBottom
              >
                Follow us to see how good of a time we have in our events!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  alignSelf: "center",
                  my: 2,
                }}
                onClick={() =>
                  window.open("https://www.instagram.com/sityex.official/")
                }
              >
                Join through link
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommunitySlides;
