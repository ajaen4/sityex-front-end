import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCity } from "actions";

import ReviewFormBase from "./ReviewFormBase";

const ReviewForm = ({ selectedCity, citiesIndex }) => {
  const auth = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCity("2038679"));
  }, [dispatch]);

  const onChangeCity = (event, selectedCity) => {
    dispatch(fetchCity(selectedCity.city_id));
  };

  return (
    <ReviewFormBase
      selectedCity={selectedCity}
      onChangeCity={onChangeCity}
      citiesIndex={citiesIndex}
      dispatch={dispatch}
      auth={auth}
    />
  );
};

export default ReviewForm;
