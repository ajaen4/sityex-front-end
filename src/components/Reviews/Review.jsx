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

const Review = ({ data }) => {
  return (
    <Card sx={{ width: "100%", padding: 1, minHeight: "200px" }}>
      <Stack spacing={2}>
        <Grid container>
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
                {data.timestamp.toDate().toLocaleDateString()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="flex-end" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.1em" }}>☀️</Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  fontSize: "1em",
                  mr: 1
                }}
              >
                Weather:
              </Typography>
              <Rating name="weather" value={Number(data.weather)} readOnly />
            </Box>
          </Grid>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="flex-end" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.1em" }}>🍲</Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  fontSize: "1em",
                  mr: 1
                }}
              >
                Food:
              </Typography>
              <Rating name="food" value={Number(data.food)} readOnly />
            </Box>
          </Grid>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="flex-end" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.1em" }}>🍹</Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  fontSize: "1em",
                  mr: 1
                }}
              >
                Social:
              </Typography>
              <Rating name="social" value={Number(data.social)} readOnly />
            </Box>
          </Grid>
          <Grid item md={6} xs={6}>
            <Box display="flex" alignItems="flex-end" sx={{ pl: 1 }}>
              <Typography sx={{ mx: 0.5, fontSize: "1.1em" }}>🧳</Typography>
              <Typography
                sx={{
                  display: { xs: "none", md: "block" },
                  fontSize: "1em",
                  mr: 1
                }}
              >
                Accessibility:
              </Typography>
              <Rating
                name="accessibility"
                value={Number(data.trips)}
                readOnly
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container sx={{ pl: 1 }}>
          <Typography sx={{ fontSize: "1em" }}>{data.advice}</Typography>
        </Grid>
      </Stack>
    </Card>
  );
};

export default Review;
