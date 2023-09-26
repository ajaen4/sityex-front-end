import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import GroupsIcon from "@mui/icons-material/Groups";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

import * as ROUTES_PATHS from "routes/paths";

const CityItems = () => {
  const navigate = useNavigate();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    navigate(`destination/${selectedCity.name}/${path}`);
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_COMMUNITY}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <ConnectWithoutContactIcon />
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_COST_OF_LIVING}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Cost of living" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_WEATHER}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Weather" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_DEMOGRAPHICS}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Demographics" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
            onClick={itemSelected}
            data-path={ROUTES_PATHS.CITY_ACCESSIBILITY}
          >
            <ConnectingAirportsIcon />
          </ListItemIcon>
          <ListItemText primary="Accessibility" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default CityItems;
