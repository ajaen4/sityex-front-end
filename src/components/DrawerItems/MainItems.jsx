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

import * as ROUTES_PATHS from "routes/paths";

const MainItems = () => {
  const router = useRouter();

  const itemSelected = (event) => {
    const path = event.currentTarget.getAttribute("data-path");
    if (path === ROUTES_PATHS.BLOG) {
      // Use window.location for external links
      window.location.href = ROUTES_PATHS.BLOG;
    } else {
      // Use router.push for internal navigation
      router.push(path);
    }
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
      {/* Uncomment this section if you want to use the Blog item */}
      {/* <ListItem disablePadding sx={{ display: "block" }}>
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
      </ListItem> */}
    </List>
  );
};

export default MainItems;
