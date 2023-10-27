import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import { logAnalyticsEvent } from "api";

import { Box, Grid } from "@mui/material";

import SingleDataCard from "components/Cards/SingleDataCard";
import StandardDataModal from "components/Modals/StandardDataModal";
import DemographicDataModal from "components/Modals/DemographicDataModal";
import TaxesDataModal from "components/Modals/TaxesDataModal";
import WeatherDataModal from "components/Modals/WeatherDataModal";

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

  const titleCategories = {
    Employment: ["salaries and financing"],
    "Month costs": ["markets", "utilities (monthly)", "rent per month"],
    Social: ["restaurants", "sports and leisure"]
  };

  const filterCosts = (data, modalType) => {
    const filteredCosts = [];
    for (const cost of data) {
      const category = cost.category.toLowerCase();
      const categories = titleCategories[modalType];
      if (categories?.includes(category)) filteredCosts.push(cost);
    }
    return filteredCosts;
  };

  return (
    <Box sx={{ overflowY: "scroll", my: 0.5, mx: 1.5 }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={4}>
          <SingleDataCard
            title="Demographics"
            icon="🧑‍🤝‍🧑"
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SingleDataCard
            title="Employment"
            icon="💼"
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SingleDataCard
            title="Weather"
            icon="☀️"
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SingleDataCard
            title="Month costs"
            icon="💸"
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SingleDataCard
            title="Taxes & Indicators"
            icon="🧾"
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SingleDataCard
            title="Social"
            icon="🍹"
            onClickData={onClickData}
            backgroundColor={theme.palette.primary}
          />
        </Grid>
      </Grid>
      <StandardDataModal
        openedModal={openedModal}
        modalType="Employment"
        onClose={() => setOpenedModal(false)}
        data={filterCosts(prices, "Employment")}
      />
      <StandardDataModal
        openedModal={openedModal}
        modalType="Month costs"
        onClose={() => setOpenedModal(false)}
        data={filterCosts(prices, "Month costs")}
      />
      <StandardDataModal
        openedModal={openedModal}
        modalType="Social"
        onClose={() => setOpenedModal(false)}
        data={filterCosts(prices, "Social")}
      />
      <WeatherDataModal
        openedModal={openedModal}
        modalType="Weather"
        onClose={() => setOpenedModal(false)}
        data={selectedCity?.weather}
      WeatherDataModal/>
      <DemographicDataModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        data={
          selectedCountry
            ? { ...selectedCountry, population: selectedCity?.population }
            : null
        }
      />
      <TaxesDataModal
        openedModal={openedModal}
        setOpenedModal={setOpenedModal}
        data={selectedCountry ? selectedCountry : null}
      />
    </Box>
  );
};

export default CityInfoPage;
