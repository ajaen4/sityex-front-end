import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import CityIcon from "@mui/icons-material/LocationCityOutlined";
import TicketIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

import * as ROUTES_PATHS from "routes/paths";

export default function CityTabs() {
  const [value, setValue] = React.useState(0);
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const theme = useTheme();
  const navigate = useNavigate();

  const itemSelected = (event, value) => {
    setValue(value);
    const path = event.currentTarget.getAttribute("data-path");
    navigate(`/destination/${selectedCity.city_id}/${path}`);
  };

  return (
    <Tabs
      value={value}
      onChange={itemSelected}
      aria-label="city-navigations"
      sx={{
        "& .MuiTabs-indicator": { backgroundColor: theme.palette.grey[100] },
        "& .Mui-selected": { color: theme.palette.grey[100] },
        "& .MuiButtonBase-root, & .MuiTab-root": {
          paddingTop: "1 !important",
          paddingBottom: "0 !important",
          minHeight: "0 !important"
        }
      }}
    >
      <Tab
        icon={<CityIcon sx={{ color: theme.palette.grey[100], width: 20 }} />}
        aria-label="city-info"
        label={
          <Typography
            variant="caption"
            color={theme.palette.grey[100]}
            style={{ margin: 0, padding: 0 }}
          >
            Info
          </Typography>
        }
        data-path={ROUTES_PATHS.CITY_INFO}
      />
      <Tab
        icon={<TicketIcon sx={{ color: theme.palette.grey[100], width: 20 }} />}
        aria-label="events"
        label={
          <Typography variant="caption" color={theme.palette.grey[100]}>
            Events
          </Typography>
        }
        data-path={ROUTES_PATHS.CITY_EVENTS}
      />
      <Tab
        icon={<PeopleIcon sx={{ color: theme.palette.grey[100], width: 20 }} />}
        aria-label="community"
        label={
          <Typography variant="caption" color={theme.palette.grey[100]}>
            Community
          </Typography>
        }
        data-path={ROUTES_PATHS.CITY_COMMUNITY}
      />
    </Tabs>
  );
}
