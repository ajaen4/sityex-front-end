import React from "react";

import { Box, Typography, Stack, Grid } from "@mui/material";

import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitySlides from "components/Slides/CitySlides";

import { imagesCdn } from "constants/constants";

const LandingPage = () => {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid
        item
        xs={12}
        sx={{
          height: "100vh",
          backgroundImage: `url(${imagesCdn}/people_kitchen.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          color="white"
          fontSize={60}
          sx={{ alignSelf: "center", textAlign: "center" }}
        >
          Discover, Connect, Belong
        </Typography>
        <Box sx={{ width: 300, mt: 10 }}>
          <CitiesAutocomplete placeholder="Enter your destination" />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 2,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            height: {
              xs: "70vh",
              md: "auto",
            },
            mt: 20,
          }}
        >
          <img
            width="80"
            height="80"
            src={`${imagesCdn}/icons/community.png`}
            alt="community icon"
            title="Community"
            style={{ mt: 10 }}
          />
          <Typography
            variant="h2"
            sx={{ color: "grey.500", my: 1, mb: 5, fontSize: 40 }}
          >
            Unlock the power of Community
          </Typography>
          <Typography
            sx={{
              fontSize: 22,
              width: {
                xs: "90%",
                md: "70%",
              },
            }}
          >
            Your go-to platform for expats, where building meaningful
            connections and navigating the journey of living abroad is made
            seamless and enriching
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center", my: 10 }}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                width="80"
                height="80"
                src={`${imagesCdn}/icons/party.png`}
                alt="events icon"
                title="Events"
              />
              <Typography
                variant="h2"
                sx={{ color: "grey.500", fontSize: 25, my: 2 }}
              >
                Events
              </Typography>
              <Typography sx={{ color: "grey.500", fontSize: 20, my: 2 }}>
                Vibrant tapestry of cultural, social, and recreational
                activities for a global community of like-minded expats
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center", my: 10 }}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                width="80"
                height="80"
                src={`${imagesCdn}/icons/house.png`}
                alt="housing icon"
                title="Housing"
              />
              <Typography
                variant="h2"
                sx={{ color: "grey.500", fontSize: 25, my: 2 }}
              >
                Housing
              </Typography>
              <Typography sx={{ color: "grey.500", fontSize: 20, my: 2 }}>
                Seamless transition to new horizons, fostering a sense of
                belonging from day one
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center", my: 10 }}
          >
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                width="80"
                height="80"
                src={`${imagesCdn}/icons/government.png`}
                alt="government icon"
                title="Government Bureaucracy"
              />
              <Typography
                variant="h2"
                sx={{ color: "grey.500", fontSize: 25, my: 2 }}
              >
                Bureaucracy Support
              </Typography>
              <Typography sx={{ color: "grey.500", fontSize: 20, my: 2 }}>
                Resources and guidance, making the paperwork and procedures
                associated with expat life more manageable and stress-free
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          mt: 20,
        }}
      >
        <img
          width="80"
          height="80"
          src={`${imagesCdn}/icons/cities.png`}
          alt="cities icon"
          title="Cities"
          style={{ mt: 10 }}
        />
        <Typography
          variant="h2"
          sx={{ color: "grey.500", my: 1, mb: 1, fontSize: 30 }}
        >
          Cities
        </Typography>
        <Typography sx={{ fontSize: 22, width: { xs: "90%", md: "70%" } }}>
          27 cities all over Spain
        </Typography>
        <CitySlides />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
