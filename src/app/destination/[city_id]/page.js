"use client";

import React from "react";
import { useSelector } from "react-redux";

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
import * as ROUTES_PATHS from "routes/paths";

const BureaucracyPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
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
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 4, md: 1 },
              mb: 2,
              minHeight: { md: 360 },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <GovernmentIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h3" component="div">
                Bureaucracy
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16, mt: 2 }}>
                We cover mostly every bureaucratic procedure you may need: NIE,
                Visa, Tax Declaration, Social Security, Health Card, etc...
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: 16 }}
                size="small"
                variant="contained"
                href={`${selectedCity.city_id}/${ROUTES_PATHS.CITY_BUREAUCRACY}`}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 4, md: 1 },
              mb: 2,
              minHeight: { md: 360 },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <HouseIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h3" component="div">
                Housing
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16, mt: 2 }}>
                Find your perfect home in {selectedCity.name}. From single rooms
                to full apartments, we've got you covered.
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: 16 }}
                size="small"
                variant="contained"
                href={`${selectedCity.city_id}/${ROUTES_PATHS.CITY_HOUSING}`}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 4, md: 1 },
              mb: 2,
              minHeight: { md: 360 },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <TicketIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h3" component="div">
                Events
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16, mt: 2 }}>
                Get to know {selectedCity.name} like a local. We organize
                exclusive SityEx events and offer third party experiences,
                concerts, parties, museums, courses, etc...
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: 16 }}
                size="small"
                variant="contained"
                href={`${selectedCity.city_id}/${ROUTES_PATHS.CITY_EVENTS}`}
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: { xs: 4, md: 1 },
              mb: 2,
              minHeight: { md: 360 },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <PeopleIcon sx={{ fontSize: 40 }} />
              <Typography gutterBottom variant="h3" component="div">
                Community
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16, mt: 2 }}>
                Start feeling at home in {selectedCity.name} from day one.
                Connect with our welcoming expat community, and discover new
                friendships right away!
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{ alignSelf: "center", fontSize: 16 }}
                size="small"
                variant="contained"
                href={`${selectedCity.city_id}/${ROUTES_PATHS.CITY_COMMUNITY}`}
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

export default BureaucracyPage;
