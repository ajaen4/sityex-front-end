import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box } from "@mui/material";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";
import { fetchCity } from "actions";

import ReviewForm from "components/Forms/ReviewForm";

const ReviewPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Review Page",
      page_location: window.location.href,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCity("2038679")); // Fetch Acheng (First city alphabetically)
  }, [dispatch]);

  return (
    <Box
      style={{
        justifyContent: "center",
        textAlign: "center",
        marginTop: 20,
      }}
    >
      <ReviewForm />
    </Box>
  );
};

export default withAuth(ReviewPage);
