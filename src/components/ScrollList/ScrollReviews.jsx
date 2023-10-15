import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

import Review from "components/Reviews/Review.jsx";
import LoadingSpinner from "components/Spinner/LoadingSpinner.jsx";
import EmptyList from "components/EmptyFill/EmptyList.jsx";

function ScrollReviews({ reviews, isFetching }) {
  const renderItem = (data, index) => (
    <ListItem key={index} sx={{ justifyContent: "center" }}>
      <Review data={data} />
    </ListItem>
  );

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      {reviews.length !== 0 && (
        <List>{reviews.map((review, index) => renderItem(review, index))}</List>
      )}
      {reviews.length === 0 && (
        <EmptyList message="There are no reviews yet, be the first to create one!" />
      )}
    </Box>
  );
}

export default ScrollReviews;
