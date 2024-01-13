import React from "react";

import { Box, Typography, Stack, Grid } from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOneOutlined";

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
              mt: 10,
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
              <Typography sx={{ color: "grey.500", fontSize: 20, mt: 2 }}>
                Exclusive SityEx and third party events to discover your new
                home city
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
              mt: 10,
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
              <Typography sx={{ color: "grey.500", fontSize: 20, mt: 2 }}>
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
              mt: 10,
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
              <Typography sx={{ color: "grey.500", fontSize: 20, mt: 2 }}>
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
          mt: 15,
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
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5,
                border: "1px solid #673ab7",
                borderRadius: "10px",
                padding: 3,
                mx: 2,
              }}
              md={3}
              xs={12}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "20px",
                    mr: 1,
                  }}
                >
                  1
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 20,
                  }}
                >
                  Sort your bureaucracy
                </Typography>
              </Box>
              <img
                width="200"
                height="50"
                src={`${imagesCdn}/partner_logos/entretramites.webp`}
                alt="entretramites icon"
                title="Entre Tramites"
                style={{ marginTop: 20 }}
              />
              <img
                width="180"
                height="40"
                src={`${imagesCdn}/partner_logos/taxdown.png`}
                alt="taxdown icon"
                title="Taxdown"
                style={{ marginTop: 20 }}
              />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                mt: 5,
                border: "1px solid #673ab7",
                borderRadius: "10px",
                padding: 3,
                mx: 2,
              }}
              md={3}
              xs={12}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "20px",
                    mr: 1,
                  }}
                >
                  2
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 20,
                  }}
                >
                  Find your new home
                </Typography>
              </Box>
              <img
                width="140"
                height="45"
                src={`${imagesCdn}/partner_logos/housing_anywhere.png`}
                alt="housinganywhere icon"
                title="HousingAnywhere"
                style={{ marginTop: 20, marginRight: 20 }}
              />
              <img
                width="200"
                height="35"
                src={`${imagesCdn}/partner_logos/uniplaces.png`}
                alt="uniplaces icon"
                title="Uniplaces"
                style={{ marginTop: 20, marginRight: 20 }}
              />
              <img
                width="80"
                height="100"
                src={`${imagesCdn}/partner_logos/spotahome.png`}
                alt="spotahome icon"
                title="Spotahome"
                style={{ marginTop: 20 }}
              />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 5,
                border: "1px solid #673ab7",
                borderRadius: "10px",
                padding: 3,
                mx: 2,
              }}
              md={3}
              xs={12}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "20px",
                    mr: 1,
                  }}
                >
                  3
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: 20,
                  }}
                >
                  Do cool stuff
                </Typography>
              </Box>
              <img
                width="100"
                height="30"
                src={`${imagesCdn}/partner_logos/fever.png`}
                alt="fever icon"
                title="Fever"
                style={{ marginTop: 20 }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          ></Box>
        </Box>
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
          mt: 15,
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
