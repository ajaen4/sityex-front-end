import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import * as ROUTES_PATHS from "routes/paths";

const withAuth = (Component) => {
  return (props) => {
    const isAuthResolved = useSelector((state) => state.auth.isAuthResolved);

    if (isAuthResolved) {
      return <Component {...props} />;
    } else {
      return <Navigate to={ROUTES_PATHS.LOG_IN} />;
    }
  };
};

export default withAuth;
