import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";
import { getReviews } from "actions";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ScrollReviews from "components/ScrollList/ScrollReviews";

const CityReviewsPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const reviews = useSelector((state) => state.reviews.data.reviews);

  const dispatch = useDispatch();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Reviews Page",
      page_location: window.location.href
    });
  }, []);

  useEffect(() => {
    dispatch(getReviews(selectedCity.city_id));
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
        <Grid item xs={12} md={7} sx={{ height: "100%", overflowY: "auto" }}>
          <ScrollReviews reviews={reviews} isFetching={false} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CityReviewsPage);
