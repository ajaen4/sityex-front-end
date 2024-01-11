import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";

import * as ROUTES_PATHS from "routes/paths";

export default function CityTabs() {
  const [value, setValue] = useState(0);
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const router = useRouter();

  const itemSelected = (event, value) => {
    setValue(value);
    const path = event.currentTarget.getAttribute("data-path");
    router.push(`/destination/${selectedCity.city_id}/${path}`);
  };

  return (
    <BottomNavigation showLabels value={value} onChange={itemSelected}>
      <BottomNavigationAction
        label="Bureaucracy"
        icon={<GovernmentIcon />}
        data-path={ROUTES_PATHS.CITY_BUREAUCRACY}
      />
      <BottomNavigationAction
        label="Events"
        icon={<TicketIcon />}
        data-path={ROUTES_PATHS.CITY_EVENTS}
      />
      <BottomNavigationAction
        label="Housing"
        icon={<HouseIcon />}
        data-path={ROUTES_PATHS.CITY_HOUSING}
      />
      <BottomNavigationAction
        label="Community"
        icon={<PeopleIcon />}
        data-path={ROUTES_PATHS.CITY_COMMUNITY}
      />
    </BottomNavigation>
  );
}
