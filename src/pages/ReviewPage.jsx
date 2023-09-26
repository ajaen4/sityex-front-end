import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { withAuth } from "session";

import ReviewForm from "components/Forms/ReviewForm";

const ReviewPage = () => {

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  useEffect(() => {
    document.title = "Review Page";
  }, []);

  return (
    <div
      style={{
        justifyContent: "center",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2 className="bold"> Fill in a review </h2>
      <ReviewForm
        selectedCity={
          selectedCity
            ? selectedCity
            : {
                name: "Aachen",
                countryName: "Germany",
                latitude: 50.776351,
                longitude: 6.083862,
              }
        }
        citiesIndex={citiesIndex !== null ? citiesIndex : []}
      />
    </div>
  );
};

export default withAuth(ReviewPage);
