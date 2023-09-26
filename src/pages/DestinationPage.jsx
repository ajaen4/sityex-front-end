import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { useTheme } from '@mui/material/styles';

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity, getReviews } from "actions";

import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

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
    document.title = "Destination Page";
  }, []);

  const cardStyle = {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
      borderRadius: '50%',
      top: -30,
      right: -180
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 210,
      height: 210,
      background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
      borderRadius: '50%',
      top: -160,
      right: -130
    }
  }

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
          <Card sx={{...cardStyle, padding: 1}}>
            <Grid container>
              <Grid item xs={3} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.primary[800],
                  color: '#fff',
                }}
                >
                  <TableChartOutlinedIcon fontSize="inherit" />
                </Avatar>
              </Grid>
              <Grid item xs={9}>
              <Typography sx={{ fontSize: 14, color: theme.palette.grey[50] }} color="text.secondary" gutterBottom>
                People in community
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 30, color: theme.palette.grey[50] }}>
                300
              </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{...cardStyle, padding: 1}}>
            <Grid container>
              <Grid item xs={3} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.primary[800],
                  color: '#fff',
                }}
                >
                  <TableChartOutlinedIcon fontSize="inherit" />
                </Avatar>
              </Grid>
              <Grid item xs={9}>
              <Typography sx={{ fontSize: 14, color: theme.palette.grey[50] }} color="text.secondary" gutterBottom>
                People in community
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 30, color: theme.palette.grey[50] }}>
                300
              </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{...cardStyle, padding: 1}}>
            <Grid container>
              <Grid item xs={3} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  backgroundColor: theme.palette.primary[800],
                  color: '#fff',
                }}
                >
                  <TableChartOutlinedIcon fontSize="inherit" />
                </Avatar>
              </Grid>
              <Grid item xs={9}>
              <Typography sx={{ fontSize: 14, color: theme.palette.grey[50] }} color="text.secondary" gutterBottom>
                People in community
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 30, color: theme.palette.grey[50] }}>
                300
              </Typography>
              </Grid>
            </Grid>
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
