import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { fetchCity } from "actions";
import { logAnalyticsEvent } from "api";

import { Box, Grid } from "@mui/material";
import SingleDataCard from "components/Cards/SingleDataCard";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import GroupsIcon from "@mui/icons-material/Groups";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WorkIcon from "@mui/icons-material/Work";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import LiquorIcon from "@mui/icons-material/Liquor";

const CityInfoPage = () => {
  const { city_id } = useParams();

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Info Page",
      page_location: window.location.href,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCity(city_id));
  }, [dispatch, city_id]);

  if (selectedCity === null || selectedCity.city_id !== city_id)
    return <CenteredLoadingSpinner />;

  return (
    <Box sx={{ mt: 2, mx: { md: 2 } }}>
      <Grid container spacing={2} sx={{ py: 1 }} justifyContent="center">
        <Grid item xs={10} md={4}>
          <SingleDataCard
            title="Demographics"
            text="Population: "
            number={selectedCity.population}
            icon={<GroupsIcon />}
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <SingleDataCard
            title="Employment Statistics"
            text="Avg net salary: "
            number="3.450 $"
            icon={<WorkIcon />}
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <SingleDataCard
            title="Weather"
            text="Mean temperature: "
            number="20 °C"
            icon={<WbSunnyIcon />}
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <SingleDataCard
            title="Month costs"
            text="Shopping cart: "
            number="450 $"
            icon={<MoneyIcon />}
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <SingleDataCard
            title="Taxes"
            text="Income tax: "
            number="39.4 %"
            icon={<MoneyOffIcon />}
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <SingleDataCard
            title="Taxes"
            text="Local beer: "
            number="3.45 $"
            icon={<LiquorIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CityInfoPage);