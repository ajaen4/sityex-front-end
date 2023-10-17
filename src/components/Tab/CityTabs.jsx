import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CityIcon from "@mui/icons-material/LocationCityOutlined";
import GradingIcon from "@mui/icons-material/GradingOutlined";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import * as ROUTES_PATHS from "routes/paths";
import { mobileTabMinHeight } from "constants/constants";

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
        icon={<PlaceIcon sx={{ color: theme.palette.grey[100], width: 20 }} />}
        aria-label="places"
        label={
          <Typography variant="caption" color={theme.palette.grey[100]}>
            Places
          </Typography>
        }
        data-path={ROUTES_PATHS.CITY_PLACES}
      />
      <Tab
        icon={
          <GradingIcon sx={{ color: theme.palette.grey[100], width: 20 }} />
        }
        aria-label="reviews"
        label={
          <Typography variant="caption" color={theme.palette.grey[100]}>
            Reviews
          </Typography>
        }
        data-path={ROUTES_PATHS.CITY_REVIEWS}
      />
    </Tabs>
  );
}
