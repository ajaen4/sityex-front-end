import React from "react";

import { Card, Grid, Typography, Stack, Avatar } from "@mui/material";

const review = ({ data }) => {
  return (
    <Card sx={{ width: "100%", padding: 1, minHeight: "200px" }}>
      <Stack container spacing={2}>
        <Grid container xs={12}>
          <Grid item xs={2} md={1}>
            <Avatar
              alt="Remy Sharp"
              src="https://i.pravatar.cc/150"
              sx={{
                m: 0,
                p: 0
              }}
            />
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
          <Grid item md={3} xs={6}>
            <Typography align="center">☀️ Weather: {data.weather}</Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            <Typography align="center">🍲 Food: {data.food}</Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            <Typography align="center">🍹 Social: {data.social}</Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            <Typography align="center">
              🧳 Accessibility: {data.trips}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} sx={{ pl: 1 }}>
          {data.advice}
        </Grid>
      </Stack>
    </Card>
  );
};

export default review;
