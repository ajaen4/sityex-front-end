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
import DataModal from "components/Modals/DataModal";

import { getMap } from "actions";

const CityInfoPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const selectedCountry = useSelector((state) => state.selectedCountry.data);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [citiesCostMap, setCitiesCostMap] = useState(null);
  const [countriesCostMap, setCountriesCostMap] = useState(null);
  const [cityPrices, setCityPrices] = useState(null);
  const [countryPrices, setCountryPrices] = useState(null);
  
  const cityHasPrices = selectedCity?.prices !== undefined ? true: false;
  const countryHasPrices = selectedCountry?.prices !== undefined ? true: false;
  const prices = (cityPrices && Object.values(cityPrices)) || (countryPrices && Object.values(countryPrices)) || [];

  const theme = useTheme();

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "City Info Page",
      page_location: window.location.href
    });
  }, []);

  useEffect(() => {
    if (cityHasPrices)
      getMap("cities_cost_map").then(
        (citiesCostMap) => setCitiesCostMap(citiesCostMap)
      );

    if (countryHasPrices)
      getMap("countries_cost_map").then(
        (countriesCostMap) => setCountriesCostMap(countriesCostMap)
      );
  }, [cityHasPrices, countryHasPrices]);

  useEffect(() => {
    
    if (cityHasPrices && citiesCostMap) {
      setCityPrices(Object.fromEntries(
        Object.entries(selectedCity.prices).map(([id, price]) => [
          id, { price, ...citiesCostMap[id], id }
        ])
      ));
    }

    if (countryHasPrices && countriesCostMap) {
      setCountryPrices(Object.fromEntries(
        Object.entries(selectedCountry.prices).map(([id, price]) => [
          id, { price, ...countriesCostMap[id], id }
        ])
      ));
    }

  }, [selectedCity, selectedCountry, citiesCostMap, countriesCostMap]);

  const onClickData = (title) => {
    setisOpenModal(true);
    setModalTitle(title);
  }

  return (
    <Box sx={{ mx: 0 }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Demographics"
            text="Population: "
            number={selectedCity.population}
            icon={<GroupsIcon/>}
            onClickData={() => {}}
            backgroundColor={theme.palette.orange}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Employment"
            text="Avg net salary: "
            number="3.450 $"
            icon={<WorkIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.secondary}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Weather"
            text="Mean temperature: "
            number="20 °C"
            icon={<WbSunnyIcon />}
            onClickData={() => {}}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Month costs"
            text="Shopping cart: "
            number="450 $"
            icon={<MoneyIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.success}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Taxes"
            text="Income tax: "
            number="39.4 %"
            icon={<MoneyOffIcon />}
            onClickData={() => {}}
            backgroundColor={theme.palette.error}
          />
        </Grid>
        <Grid item xs={11} md={4}>
          <SingleDataCard
            title="Social"
            text="Local beer: "
            number="3.45 $"
            icon={<LiquorIcon />}
            onClickData={onClickData}
            backgroundColor={theme.palette.pink}
          />
        </Grid>
      </Grid>
      <DataModal title={modalTitle} isOpenModal={isOpenModal} setisOpenModal={setisOpenModal} data={prices}/>
    </Box>
  );
};

export default withAuth(CityInfoPage);
