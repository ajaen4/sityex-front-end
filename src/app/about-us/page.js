import React from "react";

import { Box, Typography, Stack, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";

import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import CitySlides from "components/Slides/CitySlides";
import SendGAPageView from "components/DataLoaders/SendGAPageView";
import Footer from "components/Footers/Footer";

import { imagesCdn } from "constants/constants";

export const metadata = {
  title: "SityEx | About Us",
  description:
    "We are committed to making expat life easier. Our platform provides comprehensive services to help you navigate your new home, from finding housing to understanding any paperwork.",
  alternates: {
    canonical: "https://sityex.com/",
  },
};

const AboutUs = () => {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <SendGAPageView pageTitle="Landing Page" />
      <Grid item xs={12} md={7} sx={{ p: 3 }}>
        <Typography variant="h4" fontSize={50}>
          About SityEx
        </Typography>
        <Typography variant="body1" fontSize={20} sx={{ mt: 3 }}>
          We are committed to making expat life easier. Our platform provides
          comprehensive services to help you navigate your new home, from
          finding housing to managing your paperwork for you.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            height: 450,
            backgroundImage: `url(${imagesCdn}/background/about_us.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "primary.200",
          p: { xs: 5, md: 10 },
          textAlign: "center",
        }}
      >
        <Typography fontSize={20} sx={{ my: 1 }}>
          Our Mission
        </Typography>
        <Typography variant="h4" fontSize={50} sx={{ my: 1 }}>
          Making Expat Life Easier
        </Typography>
        <Typography variant="body1" fontSize={20} sx={{ my: 1 }}>
          Our mission is to simplify the expat experience. We understand the
          challenges of moving to a new country, and we're here to help.
          Housing, Paperwork and Community, we've got you covered.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          p: { xs: 5, md: 10 },
          textAlign: "center",
        }}
      >
        <Typography fontSize={20} sx={{ my: 1 }}>
          Our Values
        </Typography>
        <Typography variant="h4" fontSize={50} sx={{ my: 1 }}>
          What We Stand For
        </Typography>
        <Typography variant="body1" fontSize={20} sx={{ my: 1 }}>
          At SityEx, we believe in creating a world where everyone can feel at
          home, no matter where they are. We are committed to serving the expat
          community through 100% online completely digital services.
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6} sx={{ pr: 3, mt: { xs: 5, md: 10 } }}>
            <Box
              sx={{
                textAlign: "left",
                mt: 5,
              }}
            >
              <Typography variant="h4" fontSize={25} sx={{ mt: 1 }}>
                Community
              </Typography>
              <Typography variant="body1" fontSize={20} sx={{ mt: 1 }}>
                We believe in the power of community and strive to create a
                supportive network for expats around the world.
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "left",
                mt: 5,
              }}
            >
              <Typography variant="h4" fontSize={25} sx={{ mt: 1 }}>
                Service
              </Typography>
              <Typography variant="body1" fontSize={20} sx={{ mt: 1 }}>
                We are dedicated to providing strong and useful services
                completely online.
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "left",
                mt: 5,
              }}
            >
              <Typography variant="h4" fontSize={25} sx={{ mt: 1 }}>
                Innovation
              </Typography>
              <Typography variant="body1" fontSize={20} sx={{ mt: 1 }}>
                We are always looking for ways to improve and innovate, ensuring
                that our platform remains the best resource for expats.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: 450,
              backgroundImage: `url(${imagesCdn}/background/values.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mt: { xs: 5, md: 10 },
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          textAlign: "center",
          py: 5,
        }}
      >
        <Typography fontSize={20} sx={{ my: 1 }}>
          Our Story
        </Typography>
        <img
          width="350"
          height="420"
          src={`${imagesCdn}/profile/profile.jpg`}
          alt="profile-alberto"
          title="Profile Alberto"
        />
        <Grid container>
          <Box
            sx={{
              px: {
                xs: 5,
                md: 10,
              },
            }}
          >
            <Typography variant="h4" fontSize={50} sx={{ my: 1 }}>
              From one expat to another
            </Typography>
            <Typography variant="body1" fontSize={20} sx={{ my: 1 }}>
              Hello and welcome to SityEx, a one-stop platform for expats. My
              name is Alberto, and I created this platform inspired by my own
              journey in Sweden and Italy. It's here to make the expat life
              easier by offering all the services you need completely online in
              one place. We're all about helping you settle in. Thanks for
              joining us. Let's make this journey together.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default AboutUs;
