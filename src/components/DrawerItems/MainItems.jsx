import React from "react";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GradingIcon from "@mui/icons-material/Grading";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import * as ROUTES_PATHS from "routes/paths";

const MainItems = ({ setIsOpenDrawer }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    navigate(path);

    if (isSmallScreen) setIsOpenDrawer(false);
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          data-path={ROUTES_PATHS.SEARCH}
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search City" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          data-path={ROUTES_PATHS.MAP}
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Destinations Map" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          onClick={itemSelected}
          data-path={ROUTES_PATHS.NEW_REVIEW}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <GradingIcon />
          </ListItemIcon>
          <ListItemText primary="New Review" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MainItems;
