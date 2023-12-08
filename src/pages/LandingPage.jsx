import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Typography,
  Grid,
  Stack,
  useTheme,
  Paper,
  useMediaQuery
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import { ScrollContext } from "components/Contexts/ScrollContext";

import { data_bucket_url } from "constants/constants";

const LandingPage = () => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);
  const scrollRef = useContext(ScrollContext);

  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const onSelectCity = (event, value) => {
    navigate("/destination/" + value.city_id + "/events");
  };

  const slice = isSmallScreen ? 1 : 5;
  const createSlides = (cities) => {
    let slides = [];
    for (let i = 0; i < cities.length; i += slice) {
      slides.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh"
          }}
        >
          {cities.slice(i, i + slice).map((city) => (
            <Paper key={city.city_id} sx={{ flex: 1, m: 1 }}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                  height: "100%",
                  width: "100%",
                  borderRadius: 10,
                  backgroundImage: `url(${data_bucket_url}/cities/${city.city_id}.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                alt={city.name}
                title={city.name}
                loading="lazy"
              >
                <h2 style={{ color: "white" }}>{city.name}</h2>
              </Box>
            </Paper>
          ))}
        </Box>
      );
    }
    return slides;
  };

  return (
    <Box
      ref={scrollRef}
      sx={{
        overflowY: "scroll",
        justifyContent: "center"
      }}
    >
      <Helmet>
        <title>SityEx | Discover, Connect, Belong</title>
        <meta
          name="description"
          content="Empowering expats in Spain with SityEx. Discover communities, connect with expats, and find your belonging in your new Spanish city. Start your journey today."
        ></meta>
        <link rel="canonical" href="https://sityex.com/" />
      </Helmet>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid
          item
          xs={12}
          sx={{
            height: "100vh",
            backgroundImage: `url(${data_bucket_url}/people_kitchen.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Stack sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h1"
              color="white"
              fontSize={60}
              sx={{ alignSelf: "center", textAlign: "center" }}
            >
              Discover, Connect, Belong
            </Typography>
            <Box
              sx={{
                width: isSmallScreen ? "70%" : "40%",
                mt: 10,
                alignSelf: "center"
              }}
            >
              <CitiesAutocomplete
                citiesIndex={citiesIndex ? citiesIndex.cities : null}
                onSelectCity={onSelectCity}
                placeholder="Enter your destination"
              />
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              height: isSmallScreen ? "70vh" : "auto",
              mt: 20
            }}
          >
            <img
              width="80"
              height="80"
              src={`${data_bucket_url}/icons/community.png`}
              alt="community icon"
              title="Community"
              loading="lazy"
              style={{ mt: 10 }}
            />
            <Typography
              variant="h2"
              sx={{ color: "grey.500", my: 1, mb: 5, fontSize: 40 }}
            >
              Unlock the power of Community
            </Typography>
            <Typography
              sx={{ fontSize: 22, width: isSmallScreen ? "90%" : "70%" }}
            >
              Your go-to platform for expats, where building meaningful
              connections and navigating the journey of living abroad is made
              seamless and enriching
            </Typography>
          </Box>
          <Grid
            container
            sx={{
              justifyContent: "space-evenly"
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
                  textAlign: "center"
                }}
              >
                <img
                  width="80"
                  height="80"
                  src={`${data_bucket_url}/icons/party.png`}
                  alt="events icon"
                  title="Events"
                  loading="lazy"
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
                  textAlign: "center"
                }}
              >
                <img
                  width="80"
                  height="80"
                  src={`${data_bucket_url}/icons/house.png`}
                  alt="housing icon"
                  title="Housing"
                  loading="lazy"
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
                  textAlign: "center"
                }}
              >
                <img
                  width="80"
                  height="80"
                  src={`${data_bucket_url}/icons/government.png`}
                  alt="government icon"
                  title="Government Bureaucracy"
                  loading="lazy"
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
            mt: 20
          }}
        >
          <img
            width="80"
            height="80"
            src={`${data_bucket_url}/icons/cities.png`}
            alt="cities icon"
            title="Cities"
            loading="lazy"
            style={{ mt: 10 }}
          />
          <Typography
            variant="h2"
            sx={{ color: "grey.500", my: 1, mb: 1, fontSize: 30 }}
          >
            Cities
          </Typography>
          <Typography
            sx={{ fontSize: 22, width: isSmallScreen ? "90%" : "70%" }}
          >
            27 cities all over Spain
          </Typography>
          <Carousel
            sx={{ width: "100%", mt: 5 }}
            navButtonsAlwaysVisible
            indicators={false}
          >
            {citiesIndex?.cities && createSlides(citiesIndex.cities)}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
