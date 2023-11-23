import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

import * as ROUTES_PATHS from "routes/paths";

const CityItems = () => {
  const navigate = useNavigate();
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    navigate(`destination/${selectedCity.city_id}/${path}`);
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_EVENTS}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
            }}
          >
            <TicketIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_COMMUNITY}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
            }}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default CityItems;
