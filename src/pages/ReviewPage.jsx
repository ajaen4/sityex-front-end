import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import ReviewForm from "components/Forms/ReviewForm";

const ReviewPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Review Page",
      page_location: window.location.href,
    });
  }, []);

  return (
    <Box
      style={{
        justifyContent: "center",
        textAlign: "center",
        marginTop: 20,
      }}
    >
      <h2 className="bold"> Fill in a review </h2>
      <ReviewForm
        selectedCity={
          selectedCity
            ? selectedCity
            : {
                name: "Acheng",
                country_2_code: "CN",
                city_id: "2038679",
                coordinates: {
                  latitude: 50.776351,
                  longitude: 6.083862,
                },
              }
        }
        citiesIndex={citiesIndex !== null ? citiesIndex.cities : []}
      />
    </Box>
  );
};

export default withAuth(ReviewPage);
