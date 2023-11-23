import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button, Grid, Stack, useTheme, useMediaQuery } from "@mui/material";

import AttractionsIcon from "@mui/icons-material/AttractionsOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNoteOutlined";
import CelebrationIcon from "@mui/icons-material/CelebrationOutlined";
import BrunchDiningIcon from "@mui/icons-material/BrunchDiningOutlined";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MuseumIcon from "@mui/icons-material/Museum";
import SchoolIcon from "@mui/icons-material/School";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";

import * as ROUTES_PATHS from "routes/paths";

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        overflowY: "scroll",
        justifyContent: "center",
        p: 1
      }}
    >
      <Grid container sx={{ height: "85vh", alignItems: "center" }}>
      <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center"
          }}
        >
          <Box
            component="img"
            alt="Expats in Spain"
            src="https://sityex-public-images.s3.eu-west-1.amazonaws.com/people_kitchen.jpg"
            sx={{
              width: "100%",
              height: "auto",
              display: { xs: "flex", md: "none" }
            }}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Stack sx = {{
            display: "flex",
            alignItems: {xs: "center", md: "start"}
          }}>
            <Typography variant="h2" sx={{ fontSize: 35 }}>
              Settle seameslessly in Spain with{" "}
              <Typography
                component="span"
                variant="h1"
                sx={{ color: theme.palette.primary.main }}
              >
                SityEx
              </Typography>
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 5, mb: 2, width: 200, height: 50 }}
              onClick={() => navigate(ROUTES_PATHS.SEARCH)}
            >
              Find your city
            </Button>
            <Typography
              variant="h5"
              sx={{ fontSize: 20, mt: 5, color: theme.palette.grey[500], alignSelf: "start" }}
            >
              Partners
            </Typography>
             <Grid container>
              <Grid item xs={3}>
                <Box
                  component="img"
                  alt="Fever logo"
                  src="https://sityex-public-images.s3.eu-west-1.amazonaws.com/fever_logo.jpg"
                  sx={{ width: "100%", height: "auto" }}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            justifyContent: "center"
          }}
        >
          <Box
            component="img"
            alt="Expats in Spain"
            src="https://sityex-public-images.s3.eu-west-1.amazonaws.com/people_kitchen.jpg"
            sx={{
              width: "100%",
              height: "auto",
              display: { xs: "none", md: "flex" }
            }}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ height: "80vh", alignItems: "center" }}>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Stack>
            <Typography variant="h2" sx={{ fontSize: 35 }}>
              + 1000 events in all Spain
            </Typography>
            <Typography sx={{ fontSize: 16, mt: 4 }}>
              Complete free access to our event search engine
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          sx={{
            justifyContent: "center"
          }}
        >
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <AttractionsIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Experiences
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <MusicNoteIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Music
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <CelebrationIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Party
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <BrunchDiningIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Food & Drink
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <TheaterComedyIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Play
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <MuseumIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Museums
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <SchoolIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Courses
              </Typography>
            </Grid>
            <Grid item md={3} xs={4} sx={{ textAlign: "center", mt: 1 }}>
              <SportsGymnasticsIcon sx={{ fontSize: { md: 70, xs: 50 } }} />
              <Typography variant="h5" sx={{ fontSize: 20 }}>
                Sport
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          height: "80vh",
          alignItems: "center"
        }}
      >
        <Grid item md={7} xs={12}>
          <Stack>
            <Typography variant="h2" sx={{ fontSize: 35 }}>
              Find a vibrant community of expats
            </Typography>
            <Typography sx={{ fontSize: 16, mt: 4 }}>
              Complete free access to our community of expats and locals in
              Whatsapp community, no need to download any app!
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Box
            component="img"
            alt="Whatsapp logo"
            src="https://sityex-public-images.s3.eu-west-1.amazonaws.com/whatsapp_logo.png"
            sx={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
