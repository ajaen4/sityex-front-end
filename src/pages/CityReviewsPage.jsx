import React from "react";
import { useParams } from "react-router-dom";

import { withAuth } from "session";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const CityReviewsPage = () => {
  const { city_id } = useParams();

  return (
    <div>No data yet</div>
  )
};

export default withAuth(CityReviewsPage);
