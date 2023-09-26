import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity } from "actions";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

const AccessibilityPage = () => {
  const { location } = useParams();
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  useEffect(() => {
    document.title = "Accessibility Page";
  }, []);

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));
  }, [dispatch, location]);

  if (selectedCity === null || selectedCity.name !== prettyCity(location))
    return <CenteredLoadingSpinner />;

  return <div>No data for the moment</div>;
};

export default withAuth(AccessibilityPage);
