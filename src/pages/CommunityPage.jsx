import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity, getReviews } from "actions";

import { Box, Grid } from "@mui/material";
import SingleDataCard from "cards/SingleDataCard";
import RecommendationsMap from "components/Maps/RecommendationsMap";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import GroupsIcon from "@mui/icons-material/Groups";
import GradingIcon from "@mui/icons-material/Grading";
import PlaceIcon from "@mui/icons-material/Place";

const CommunityPage = () => {
  const [reviews, setreviews] = useState([]);
  const { location } = useParams();

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth.data);
  const isFetchingReviews = useSelector((state) => state.reviews.isFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Community Page";
  }, []);

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
      <Grid container spacing={2} sx={{ py: 1 }} justifyContent="center">
        <Grid item xs={12} md={3}>
          <SingleDataCard title="Users" number="553" icon={<GroupsIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <SingleDataCard title="Reviews" number="345" icon={<GradingIcon />} />
        </Grid>
        <Grid item xs={12} md={3}>
          <SingleDataCard
            title="Recommended places"
            number="128"
            icon={<PlaceIcon />}
          />
        </Grid>
        <Grid item xs={12}>
          <RecommendationsMap selectedCity={selectedCity} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CommunityPage);
