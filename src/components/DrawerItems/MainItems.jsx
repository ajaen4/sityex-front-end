import React from "react";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GradingIcon from "@mui/icons-material/Grading";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MainItems = () => {
  const navigate = useNavigate();

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    navigate(path);
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
          data-path="new-review"
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
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          data-path="home"
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Destinations" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MainItems;