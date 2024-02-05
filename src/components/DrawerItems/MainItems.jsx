"use client";

import React from "react";
import { useRouter } from "next/navigation";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import NewspaperIcon from "@mui/icons-material/NewspaperOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3Outlined";

import * as ROUTES_PATHS from "routes/paths";

const MainItems = () => {
  const router = useRouter();

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    router.push(path);
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
          data-path={ROUTES_PATHS.BLOG}
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
          data-path={ROUTES_PATHS.ABOUT_US}
          onClick={itemSelected}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: "center",
            }}
          >
            <Diversity3Icon />
          </ListItemIcon>
          <ListItemText primary="About us" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MainItems;
