import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import { Box, Grid } from "@mui/material";
import SingleDataCard from "components/Cards/SingleDataCard";

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

  const theme = useTheme();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Info Page",
      page_location: window.location.href,
    });
  }, []);

  return (
    <Box sx={{ mx: { md: 2 } }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Demographics"
            text="Population: "
            number={selectedCity.population}
            icon={<GroupsIcon />}
            backgroundColor={theme.palette.orange}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Employment"
            text="Avg net salary: "
            number="3.450 $"
            icon={<WorkIcon />}
            backgroundColor={theme.palette.secondary}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Weather"
            text="Mean temperature: "
            number="20 °C"
            icon={<WbSunnyIcon />}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Month costs"
            text="Shopping cart: "
            number="450 $"
            icon={<MoneyIcon />}
            backgroundColor={theme.palette.success}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Taxes"
            text="Income tax: "
            number="39.4 %"
            icon={<MoneyOffIcon />}
            backgroundColor={theme.palette.error}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Social"
            text="Local beer: "
            number="3.45 $"
            icon={<LiquorIcon />}
            backgroundColor={theme.palette.pink}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CityInfoPage);
