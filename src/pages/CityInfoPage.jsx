import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { withAuth } from "session";
import { logAnalyticsEvent } from "api";

import { Box, Grid } from "@mui/material";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunnyOutlined";
import WorkIcon from "@mui/icons-material/WorkOutlined";
import MoneyIcon from "@mui/icons-material/AttachMoneyOutlined";
import MoneyOffIcon from "@mui/icons-material/MoneyOffOutlined";
import LiquorIcon from "@mui/icons-material/LiquorOutlined";

import SingleDataCard from "components/Cards/SingleDataCard";
import PriceDataModal from "components/Modals/PriceDataModal";
import DemographicDataModal from "components/Modals/DemographicDataModal";

import { getMap } from "actions";

const CityInfoPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const selectedCountry = useSelector((state) => state.selectedCountry.data);
  const [openedModal, setOpenedModal] = useState(false);
  const [citiesCostMap, setCitiesCostMap] = useState(null);
  const [countriesCostMap, setCountriesCostMap] = useState(null);

  const cityHasPrices = selectedCity?.prices !== undefined ? true : false;
  const countryHasPrices = selectedCountry?.prices !== undefined ? true : false;

  const cityPrices =
    cityHasPrices && citiesCostMap
      ? Object.fromEntries(
          Object.entries(selectedCity.prices).map(([id, price]) => [
            id,
            { price, ...citiesCostMap[id], id }
          ])
        )
      : null;
  const countryPrices =
    countryHasPrices && countriesCostMap
      ? Object.fromEntries(
          Object.entries(selectedCountry.prices).map(([id, price]) => [
            id,
            { price, ...countriesCostMap[id], id }
          ])
        )
      : null;

  const prices =
    (cityPrices && Object.values(cityPrices)) ||
    (countryPrices && Object.values(countryPrices)) ||
    [];

  const theme = useTheme();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Info Page",
      page_location: window.location.href
    });
  }, []);

  useEffect(() => {
    if (cityHasPrices)
      getMap("cities_cost_map").then((citiesCostMap) =>
        setCitiesCostMap(citiesCostMap)
      );

    if (countryHasPrices)
      getMap("countries_cost_map").then((countriesCostMap) =>
        setCountriesCostMap(countriesCostMap)
      );
  }, [cityHasPrices, countryHasPrices]);

  const onClickData = (title) => {
    setOpenedModal(title);
  };

  const extractPrice = (prices, name) => {
    return prices?.filter((price) => price.name === name)[0]?.price;
  };

  return (
    <Box sx={{ overflowY: "scroll", my: 0.5, mx: 1.5 }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Demographics"
            text="Population: "
            number={selectedCity.population}
            icon={<GroupsIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.orange}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Employment"
            text="Avg monthly net salary: "
            units="$"
            number={extractPrice(
              prices,
              "salaries_and_financing_average_monthly_net_salary"
            )}
            icon={<WorkIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.secondary}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Weather"
            text="Mean temperature: "
            number="20"
            units="Cº"
            icon={<WbSunnyIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Month costs"
            text="Shopping cart: "
            number="450"
            units="$"
            icon={<MoneyIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.success}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Taxes & Indicators"
            text="Income tax: "
            number="39.4"
            units="%"
            icon={<MoneyOffIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.error}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Social"
            text="Local beer: "
            number={extractPrice(prices, "restaurants_domestic_beer")}
            units="$"
            icon={<LiquorIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.pink}
          />
        </Grid>
      </Grid>
      <PriceDataModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        data={prices}
      />
      <DemographicDataModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        data={
          selectedCountry
            ? { ...selectedCountry, population: selectedCity?.population }
            : null
        }
      />
    </Box>
  );
};

export default withAuth(CityInfoPage);
