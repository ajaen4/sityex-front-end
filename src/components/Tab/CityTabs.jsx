import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CityIcon from "@mui/icons-material/LocationCity";
import GradingIcon from "@mui/icons-material/Grading";
import PlaceIcon from "@mui/icons-material/Place";

import * as ROUTES_PATHS from "routes/paths";

export default function IconTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const itemSelected = (event, value) => {
    setValue(value);
    const path = event.currentTarget.getAttribute("data-path");
    navigate(`destination/${selectedCity.city_id}/${path}`);
  };

  return (
    <Tabs value={value} onChange={itemSelected} aria-label="city-navigations">
      <Tab
        icon={<CityIcon />}
        aria-label="city-info"
        data-path={ROUTES_PATHS.CITY_INFO}
      />
      <Tab
        icon={<PlaceIcon />}
        aria-label="places"
        data-path={ROUTES_PATHS.CITY_PLACES}
      />
      <Tab
        icon={<GradingIcon />}
        aria-label="reviews"
        data-path={ROUTES_PATHS.CITY_REVIEWS}
      />
    </Tabs>
  );
}
