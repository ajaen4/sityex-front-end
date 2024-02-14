import React from "react";

import { Box, Typography, Grid, Card } from "@mui/material";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";

import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitySlides from "components/Slides/CitySlides";
import HousingSlides from "components/Slides/HousingSlides";
import PaperworkSlides from "components/Slides/PaperworkSlides";
import EventsSlides from "components/Slides/EventsSlides";
import SendGAPageView from "components/DataLoaders/SendGAPageView";
import Footer from "components/Footers/Footer";
import Services from "components/Interactive/Services";

import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | One-stop platform for expats",
  description:
    "Community-based, one-stop platform for all expat needs in Spain. We focus on housing and paperwork services with a vibrant community at its base.",
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imagesCdn}/background/landing.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          color="white"
          fontSize={50}
          sx={{
            textAlign: "center",
            alignSelf: "center",
            mt: 20,
          }}
        >
          Discover, Connect, Belong
        </Typography>
        <Box sx={{ width: 250, mt: 5, mb: { xs: 10, md: 15 } }}>
          <CitiesAutocomplete placeholder="Enter your destination" />
        </Box>
        <Typography
          variant="h1"
          color="white"
          fontSize={20}
          sx={{
            mb: 2,
          }}
        >
          One-stop platform for expats
        </Typography>
        <Box sx={{ display: "flex", mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mx: 3,
            }}
          >
            <GovernmentIcon sx={{ color: "white", fontSize: 40 }} />
            <Typography color="white"> Paperwork </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mx: 3,
            }}
          >
            <HouseIcon sx={{ color: "white", fontSize: 40 }} />
            <Typography color="white"> Housing </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mx: 3,
            }}
          >
            <PeopleIcon sx={{ color: "white", fontSize: 40 }} />
            <Typography color="white"> Community </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "grey.500", fontSize: 35, px: 3 }}
          >
            Your one-stop platform for expats
          </Typography>
          <Typography
            variant="h1"
            sx={{
              mt: 2,
              fontSize: 22,
              width: "100%",

              px: 3,
            }}
          >
            Community-based, one-stop platform for expats
          </Typography>
        </Box>
        <Services />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
          mt: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/signpost-fill.png`}
            alt="choose-city"
            title="Choose City"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 30 }}>
            Choose your city
          </Typography>
        </Box>
        <CitySlides />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
          mt: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/paperclip.png`}
            alt="choose-paperwork"
            title="Choose Paperwork"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 30 }}>
            Need help with your paperwork?
          </Typography>
        </Box>
        <PaperworkSlides />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/house-door-fill.png`}
            alt="housing-icon"
            title="Housing"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 30 }}>
            Housing
          </Typography>
        </Box>
        <HousingSlides />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            width="25"
            height="25"
            src={`${imagesCdn}/icons/sunglasses.png`}
            alt="events-icon"
            title="Events"
            style={{ marginRight: 10 }}
          />
          <Typography variant="h2" sx={{ color: "grey.500", fontSize: 30 }}>
            Trending Events
          </Typography>
        </Box>
        <EventsSlides />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          px: 3,
          pb: 10,
          pt: 2,
          mt: 2,
          backgroundColor: "grey.100",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "grey.500", mb: 2, fontSize: 35 }}
          >
            How it works
          </Typography>
          <Typography
            sx={{
              fontSize: 22,
              width: "100%",
            }}
          >
            We establish partnerships with local experts specializing in various
            aspects of the expat journey, offering our members exclusive
            integrations and discounts.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              flexWrap: "wrap",
              mt: 5,
            }}
          >
            <img
              width="200"
              height="50"
              src={`${imagesCdn}/partner_logos/entretramites.webp`}
              alt="entretramites icon"
              title="Entre Tramites"
              style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
            />
            <a
              href="https://taxdown.es/landings_partners/sityex/?utm_source=empleados&utm_medium=partnership&utm_campaign=empleados_partnership"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="200"
                height="40"
                src={`${imagesCdn}/partner_logos/taxdown.png`}
                alt="taxdown icon"
                title="Taxdown"
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
              />
            </a>
            <img
              width="140"
              height="45"
              src={`${imagesCdn}/partner_logos/housing_anywhere.png`}
              alt="housinganywhere icon"
              title="HousingAnywhere"
              style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
            />
            <img
              width="80"
              height="100"
              src={`${imagesCdn}/partner_logos/spotahome.png`}
              alt="spotahome icon"
              title="Spotahome"
              style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
            />
            <img
              width="180"
              height="35"
              src={`${imagesCdn}/partner_logos/uniplaces.png`}
              alt="uniplaces icon"
              title="Uniplaces"
              style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
            />
            <img
              width="100"
              height="30"
              src={`${imagesCdn}/partner_logos/fever.png`}
              alt="fever icon"
              title="Fever"
              style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
