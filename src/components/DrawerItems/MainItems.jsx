import React from "react";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import NewspaperIcon from "@mui/icons-material/NewspaperOutlined";

import { useTheme } from "@mui/material/styles";

import * as ROUTES_PATHS from "routes/paths";

const MainItems = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    if (path === ROUTES_PATHS.BLOG) {
      window.location.href = ROUTES_PATHS.BLOG;
    }

    navigate(path);
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5
          }}
          data-path={ROUTES_PATHS.SEARCH}
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
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
            px: 2.5
          }}
          data-path={ROUTES_PATHS.BLOG}
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center"
            }}
          >
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MainItems;
