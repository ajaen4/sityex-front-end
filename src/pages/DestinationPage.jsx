import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity, getReviews } from "actions";
import { Container, Tab, Tabs, Box, Typography, Grid } from "@mui/material";

import DestinationPageHeader from "components/Headers/DestinationPageHeader";
import RecomendationsMap from "components/Maps/RecomendationsMap";
import ScrollReviews from "components/ScrollList/ScrollReviews";
import CityInfo from "components/CityData/CityInfo";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const DestinationPage = ({
  selectedCity,
  auth,
  isFetchingReviews,
  dispatch,
}) => {
  const [value, setValue] = useState(0);
  const [reviews, setreviews] = useState([]);
  const { location } = useParams();

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
    </Box>
  );
};

const mapStateToProps = (state) => ({
  selectedCity: state.selectedCity.data,
  auth: state.auth.data,
  isFetchingReviews: state.reviews.isFetching,
});

export default connect(mapStateToProps)(withAuth(DestinationPage));
