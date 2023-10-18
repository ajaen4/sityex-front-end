import React from "react";

import {
  Card,
  Grid,
  Typography,
  Stack,
  Avatar,
  Rating,
  Box
} from "@mui/material";

const review = ({ data }) => {
  return (
    <Card sx={{ width: "100%", padding: 1, minHeight: "200px" }}>
      <Stack container spacing={2}>
        <Grid container xs={12}>
          <Grid
            item
            xs={2}
            md={1}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150" />
          </Grid>
          <Grid item xs={10} md={11}>
            <Stack>
              <Typography variant="h5" sx={{ mx: 1 }}>
                {data.userName}
              </Typography>
              <Typography sx={{ mx: 1, fontSize: "0.9em" }}>
                Home city
              </Typography>
              <Typography sx={{ mx: 1, fontSize: "0.8em" }}>
                07/10/2021
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="center" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.3em" }}>☀️</Typography>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, fontSize: "1em" }}
              >
                Weather:
              </Box>
              <Rating name="weather" value={data.weather} readOnly />
            </Box>
          </Grid>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="center" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.3em" }}>🍲</Typography>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, fontSize: "1em" }}
              >
                Food:
              </Box>
              <Rating name="food" value={data.food} readOnly />
            </Box>
          </Grid>
          <Grid item md={6} xs={6}>
            <Box display="flex" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.3em" }}>🍹</Typography>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, fontSize: "1em" }}
              >
                Social:
              </Box>
              <Rating name="social" value={data.social} readOnly />
            </Box>
          </Grid>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="center" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.3em" }}>🧳</Typography>
              <Box
                sx={{ display: { xs: "none", md: "flex" }, fontSize: "1em" }}
              >
                Accessibility
              </Box>
              <Rating name="social" value={data.trips} readOnly />
            </Box>
          </Grid>
        </Grid>
        <Grid container xs={12} sx={{ pl: 1 }}>
          <Typography sx={{ fontSize: "1em" }}>{data.advice}</Typography>
        </Grid>
      </Stack>
    </Card>
  );
};

export default review;
