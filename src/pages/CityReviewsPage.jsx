import React from "react";
import { useParams } from "react-router-dom";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

const CityReviewsPage = () => {
  const { city_id } = useParams();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Reviews Page",
      page_location: window.location.href,
    });
  }, []);

  return <div>No data yet</div>;
};

export default withAuth(CityReviewsPage);
