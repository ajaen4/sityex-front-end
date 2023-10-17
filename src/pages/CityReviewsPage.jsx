import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";
import { getReviews } from "actions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ScrollReviews from "components/ScrollList/ScrollReviews";

const CityReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const selectedCity = useSelector((state) => state.selectedCity.data);

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Reviews Page",
      page_location: window.location.href
    });
  }, []);

  useEffect(() => {
    getReviews(selectedCity.city_id).then((reviews) => {
      if (reviews) setReviews(reviews);
    });
  }, [selectedCity]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexGrow: 1
      }}
    >
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={6} sx={{ height: "100%", overflowY: "auto" }}>
          <ScrollReviews reviews={reviews} isFetching={false} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CityReviewsPage);
