"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import HouseIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import GovernmentIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

import * as ROUTES_PATHS from "routes/paths";

const CityItems = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);

  if (!selectedCity) {
    return null;
  }

  return (
    <List>
      {[
        {
          icon: <GovernmentIcon />,
          text: "Paperwork",
          path: ROUTES_PATHS.CITY_PAPERWORK,
        },
        {
          icon: <HouseIcon />,
          text: "Housing",
          path: ROUTES_PATHS.CITY_HOUSING,
        },
        {
          icon: <PeopleIcon />,
          text: "Community",
          path: ROUTES_PATHS.CITY_COMMUNITY,
        },
      ].map((item) => (
        <ListItem disablePadding sx={{ display: "block" }} key={item.text}>
          <Link
            href={`/services/${selectedCity.city_id}/${item.path}`}
            passHref
            style={{ textDecoration: "none" }}
          >
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
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default CityItems;
