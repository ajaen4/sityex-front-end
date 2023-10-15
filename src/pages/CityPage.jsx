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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Typography variant="h1" sx={{ textAlign: "center", my: 2 }}>
        {selectedCity.name}
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          overflowY: "hidden",
        }}
      >
        <Outlet />
      </Box>
      {isDestinationPage && isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <CityTabs />
        </Box>
      )}
    </Box>
  );
};

export default withAuth(CityPage);
