import React, { useEffect } from "react";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ScrollReviews from "components/ScrollList/ScrollReviews";

const CityReviewsPage = () => {

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Reviews Page",
      page_location: window.location.href,
    });
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item xs={11}>
          <ScrollReviews reviews={[]} isFetching={false} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CityReviewsPage);
