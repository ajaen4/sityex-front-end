import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity } from "actions";

import ReviewFormBase from "./ReviewFormBase";

const ReviewForm = ({ selectedCity, citiesIndex }) => {
  const INITIALCITY = "Aachen";
  const auth = useSelector(state => state.auth.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCity(prettyCity(INITIALCITY)));
  }, [dispatch]);

  const onChangeCity = (event) => {
    dispatch(fetchCity(prettyCity(event.target.value)));
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
