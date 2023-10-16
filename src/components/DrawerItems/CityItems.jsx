import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CityIcon from "@mui/icons-material/LocationCityOutlined";
import GradingIcon from "@mui/icons-material/GradingOutlined";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import * as ROUTES_PATHS from "routes/paths";

const CityItems = ({ setIsOpenDrawer }) => {
  const navigate = useNavigate();
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    navigate(`destination/${selectedCity.city_id}/${path}`);

    if (isSmallScreen) setIsOpenDrawer(false);
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
          data-path={ROUTES_PATHS.CITY_INFO}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
            }}
          >
            <CityIcon />
          </ListItemIcon>
          <ListItemText primary="Info" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_PLACES}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
            }}
          >
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary="Places" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.CITY_REVIEWS}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
            }}
          >
            <GradingIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default CityItems;
