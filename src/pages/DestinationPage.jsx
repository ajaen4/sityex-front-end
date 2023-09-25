import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { useTheme } from '@mui/material/styles';

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity, getReviews } from "actions";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const DestinationPage = ({
  selectedCity,
  auth,
  isFetchingReviews,
  dispatch,
}) => {
  const [reviews, setreviews] = useState([]);
  const { location } = useParams();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));

    getReviews(prettyCity(location)).then((reviews) => {
      setreviews(reviews.sort((a, b) => b.timeStamp - a.timeStamp));
    });
  }, [dispatch, location]);

  if (selectedCity === null || selectedCity.name !== prettyCity(location))
    return <CenteredLoadingSpinner />;

  return (
    <Box>
      <Grid container spacing={1} sx={{py: 1}}>
        <Grid item xs={12} md={4}>
          <Card sx={{ minWidth: 275, backgroundColor: theme.palette.primary[800] }}>
            <CardContent>
              <Typography sx={{ fontSize: 14, color: theme.palette.grey[50] }} color="text.secondary" gutterBottom>
                People in community
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 30, color: theme.palette.grey[50] }}>
                300
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ minWidth: 275, backgroundColor: theme.palette.primary[800] }}>
            <CardContent>
              <Typography sx={{ fontSize: 14, color: theme.palette.grey[50] }} color="text.secondary" gutterBottom>
                Reviews
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 30, color: theme.palette.grey[50] }}>
                250
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ minWidth: 275, backgroundColor: theme.palette.primary[800] }}>
            <CardContent>
              <Typography sx={{ fontSize: 14, color: theme.palette.grey[50] }} color="text.secondary" gutterBottom>
                Visits today
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 30, color: theme.palette.grey[50] }}>
                250
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  selectedCity: state.selectedCity.data,
  auth: state.auth.data,
  isFetchingReviews: state.reviews.isFetching,
});

export default connect(mapStateToProps)(withAuth(DestinationPage));
