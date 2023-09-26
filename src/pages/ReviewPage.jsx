import React, { useEffect } from "react";
import { connect } from "react-redux";

import { withAuth } from "session";

import ReviewForm from "components/Forms/ReviewForm";

const ReviewPage = ({ selectedCity, citiesIndex }) => {

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

const mapStateToProps = (state) => ({
  citiesIndex: state.citiesIndex.data,
  selectedCity: state.selectedCity.data,
});

export default connect(mapStateToProps)(withAuth(ReviewPage));
