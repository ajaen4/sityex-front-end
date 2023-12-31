import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingSpinner = ({ color }) => {
  return <CircularProgress style={{ color: color !== undefined ? color : "main" }}/>;
};

export default LoadingSpinner;
