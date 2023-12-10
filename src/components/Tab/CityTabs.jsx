import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

import * as ROUTES_PATHS from "routes/paths";

export default function CityTabs() {
  const [value, setValue] = React.useState(0);
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const theme = useTheme();
  const navigate = useNavigate();

  const itemSelected = (event, value) => {
    setValue(value);
    const path = event.currentTarget.getAttribute("data-path");
    navigate(`/destination/${selectedCity.city_id}/${path}`);
  };

  return (
    <BottomNavigation showLabels value={value} onChange={itemSelected}>
      <BottomNavigationAction
        label="Events"
        icon={<TicketIcon />}
        data-path={ROUTES_PATHS.CITY_EVENTS}
      />
      <BottomNavigationAction
        label="Community"
        icon={<PeopleIcon />}
        data-path={ROUTES_PATHS.CITY_COMMUNITY}
      />
    </BottomNavigation>
  );
}
