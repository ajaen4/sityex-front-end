"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";

import SendGAPageView from "components/DataLoaders/SendGAPageView";
import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";

import * as ROUTES_PATHS from "routes/paths";

const PaperworkPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth);

  const { setShowSignUpModal } = useShowSignUpContext();

  const router = useRouter();

  const onClickExplore = (section) => {
    if (
      section === ROUTES_PATHS.CITY_COMMUNITY &&
      auth.isAuthResolved === false
    ) {
      setShowSignUpModal(true);
    } else {
      router.push(`/destination/${selectedCity.city_id}/${section}`);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <SendGAPageView
        pageTitle="City Main Page"
        selectedCity={{
          city_name: selectedCity.name,
          city_id: selectedCity.city_id,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <img
          loading="lazy"
          width="30"
          src={`https://flagcdn.com/w160/${selectedCity.country_2_code.toLowerCase()}.png`}
          alt="City Image"
          style={{ marginRight: "10px" }}
        />

        <Typography color="textSecondary" variant="h2">
          {selectedCity.name}
        </Typography>
      </Box>
      <Typography variant="h1" sx={{ my: 3, fontSize: 30 }}>
        Available services
      </Typography>
      <Grid container>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 0.5, md: 1 },
              mb: 2,
            }}
          >
            <CardContent
              sx={{ pb: 0, minHeight: { xs: 235, md: 250, lg: 205 } }}
            >
              <GovernmentIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
              <Typography gutterBottom variant="h3" component="div">
                Paperwork
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: 15, md: 16 }, mt: 2 }}
              >
                We cover mostly every bureaucratic procedure you may need
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: { xs: 15, md: 16 } }}
                size="small"
                variant="contained"
                onClick={() => onClickExplore(ROUTES_PATHS.CITY_BUREAUCRACY)}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 0.5, md: 1 },
              mb: 2,
            }}
          >
            <CardContent
              sx={{ pb: 0, minHeight: { xs: 235, md: 250, lg: 205 } }}
            >
              <HouseIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
              <Typography gutterBottom variant="h3" component="div">
                Housing
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: 15, md: 16 }, mt: 2 }}
              >
                Find your perfect home. From single rooms to full apartments,
                we've got you covered.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: { xs: 15, md: 16 } }}
                size="small"
                variant="contained"
                onClick={() => onClickExplore(ROUTES_PATHS.CITY_HOUSING)}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 0.5, md: 1 },
              mb: 2,
            }}
          >
            <CardContent
              sx={{ pb: 0, minHeight: { xs: 235, md: 250, lg: 205 } }}
            >
              <TicketIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
              <Typography gutterBottom variant="h3" component="div">
                Events
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: 15, md: 16 }, mt: 2 }}
              >
                We organize exclusive SityEx events and offer third party
                experiences, concerts, etc...
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: { xs: 15, md: 16 } }}
                size="small"
                variant="contained"
                onClick={() => onClickExplore(ROUTES_PATHS.CITY_EVENTS)}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 0.5, md: 1 },
              mb: 2,
            }}
          >
            <CardContent
              sx={{ pb: 0, minHeight: { xs: 235, md: 250, lg: 205 } }}
            >
              <PeopleIcon sx={{ fontSize: { xs: 30, md: 40 } }} />
              <Typography gutterBottom variant="h3" component="div">
                Community
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: 15, md: 16 }, mt: 2 }}
              >
                Start feeling at home from day one. Connect with our welcoming
                expat community!
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: { xs: 15, md: 16 } }}
                size="small"
                variant="contained"
                onClick={() => onClickExplore(ROUTES_PATHS.CITY_COMMUNITY)}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaperworkPage;
