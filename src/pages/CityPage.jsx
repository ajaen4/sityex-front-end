import React, { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { fetchCity, fetchCountry } from "actions";

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
  const isCityPlacesPage = pathname.split("/").includes("places");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCity(city_id));
  }, [city_id]);

  useEffect(() => {
    if (selectedCity) dispatch(fetchCountry(selectedCity.country_3_code));
  }, [selectedCity]);

  if (selectedCity === null || selectedCity.city_id !== city_id)
    return <CenteredLoadingSpinner />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "grey.100"
      }}
    >
      {!isCityPlacesPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2
          }}
        >
          <img
            loading="lazy"
            width="30"
            src={`https://flagcdn.com/w160/${selectedCity.country_2_code.toLowerCase()}.png`}
            alt="City Image"
            style={{ marginRight: "10px" }}
          />

          <Typography color="textSecondary" variant="h2">
            {selectedCity.name}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          overflowY: "hidden"
        }}
      >
        <Outlet />
      </Box>
      {isDestinationPage && isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main
          }}
        >
          <CityTabs />
        </Box>
      )}
    </Box>
  );
};

export default CityPage;
