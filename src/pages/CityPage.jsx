import React, { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { withAuth } from "session";
import { fetchCity } from "actions";

import { Box, Typography } from "@mui/material";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import CityTabs from "components/Tab/CityTabs";

const CityPage = () => {
  const { city_id } = useParams();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const theme = useTheme();
  const { pathname } = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDestinationPage = pathname.split("/").includes("destination");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCity(city_id));
  }, [dispatch, city_id]);

  if (selectedCity === null || selectedCity.city_id !== city_id)
    return <CenteredLoadingSpinner />;

  return (
    <Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
      <Typography variant="h2" sx={{ textAlign: "center", mt: 3, mb: {md: 1, lg: 3} }}>
          {selectedCity.name}
        </Typography>
        {isDestinationPage && isSmallScreen && (
          <Box sx={{ p: 1.5, display: "flex", justifyContent: "center" }}>
            <CityTabs />
          </Box>
        )}
      <Outlet />
    </Box>
  );
};

export default withAuth(CityPage);
