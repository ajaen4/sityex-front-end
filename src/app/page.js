import React from "react";

import { Box, Typography, Stack, Grid } from "@mui/material";

import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitySlides from "components/Slides/CitySlides";
import SendGAPageView from "components/DataLoaders/SendGAPageView";

import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | Discover, Connect, Belong",
  description:
    "Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today.",
  alternates: {
    canonical: "https://sityex.com/",
  },
};

const LandingPage = () => {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <SendGAPageView pageTitle="Landing Page" />
      <Grid
        item
        xs={12}
        sx={{
          height: "100vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${imagesCdn}/landing.jpg)`,
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
          sx={{
            alignSelf: "center",
            textAlign: "center",
            mt: { xs: -10, md: -20 },
          }}
        >
          Discover, Connect, Belong
        </Typography>
        <Box sx={{ width: 250, mt: 10 }}>
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
          mt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            height: {
              xs: "60vh",
              md: "auto",
            },
          }}
        >
          <img
            width="80"
            height="80"
            src={`${imagesCdn}/icons/community.png`}
            alt="community icon"
            title="Community"
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
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 5, md: 10 },
            }}
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
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 5, md: 10 },
            }}
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
                Housing options and discounts through our partners to help you
                find your ideal home
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 5, md: 10 },
            }}
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
                Automatized processes through our local partners that do the
                paperwork for you
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
          flexDirection: "column",
          px: 2,
          alignItems: "center",
          textAlign: "center",
          mt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            width="80"
            height="80"
            src={`${imagesCdn}/icons/how_it_works.png`}
            alt="how it works"
            title="How it works"
          />
          <Typography
            variant="h2"
            sx={{ color: "grey.500", my: 1, fontSize: 40 }}
          >
            How it works
          </Typography>
          <Typography
            sx={{
              fontSize: 22,
              mt: 5,
              width: {
                xs: "90%",
                md: "70%",
              },
            }}
          >
            We establish partnerships with local experts specializing in various
            aspects of the expat journey, offering our members exclusive
            integrations and discounts.
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
            xs={6}
            md={4}
            xl={3}
            sx={{ mt: { xs: 5, md: 10 }, maxHeight: 60 }}
          >
            <img
              width="70%"
              height="100%"
              src={`${imagesCdn}/partner_logos/taxdown.png`}
              alt="taxdown icon"
              title="Taxdown"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            xl={2}
            sx={{ mt: { xs: 5, md: 10 }, maxHeight: 60 }}
          >
            <img
              width="50%"
              height="80%"
              src={`${imagesCdn}/partner_logos/fever.png`}
              alt="fever icon"
              title="Feverup"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            xl={2}
            sx={{ mt: { xs: 7, md: 11 }, maxHeight: 60 }}
          >
            <img
              width="80%"
              height="65%"
              src={`${imagesCdn}/partner_logos/tax_scouts.png`}
              alt="taxscouts icon"
              title="TaxScouts"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            xl={2}
            sx={{ mt: { xs: 5, md: 10 }, maxHeight: 180 }}
          >
            <img
              width="40%"
              height="100%"
              src={`${imagesCdn}/partner_logos/spotahome.png`}
              alt="spotahome icon"
              title="SpotAHome"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            xl={3}
            sx={{ mt: { xs: 5, md: 10 }, maxHeight: 80 }}
          >
            <img
              width="60%"
              height="100%"
              src={`${imagesCdn}/partner_logos/housing_anywhere.png`}
              alt="housing anywhere icon"
              title="Housing Anywhere"
            />
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
          mt: 10,
        }}
      >
        <img
          width="80"
          height="80"
          src={`${imagesCdn}/icons/cities.png`}
          alt="cities icon"
          title="Cities"
        />
        <Typography
          variant="h2"
          sx={{ color: "grey.500", my: 1, mb: 1, fontSize: 30 }}
        >
          Cities
        </Typography>
        <Typography sx={{ fontSize: 22, width: { xs: "90%", md: "70%" } }}>
          Cities all over Spain
        </Typography>
        <CitySlides />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
