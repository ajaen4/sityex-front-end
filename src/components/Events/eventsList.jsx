import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ImageList,
  ImageListItem,
  useMediaQuery
} from "@mui/material";

const EventsList = ({ events}) => {

  const selectedCity = useSelector((state) => state.selectedCity.data);

  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleEventClick = (eventSku) => {
    navigate(`/destination/${selectedCity.city_id}/event/${eventSku}`);
  };

  return (
    <ImageList cols={isSmallScreen ? 3 : 5}>
        {events?.map((event) => (
        <ImageListItem
            key={event.sku}
            onClick={() => handleEventClick(event.sku)}
        >
            <img
            srcSet={event.photo_1}
            src={event.photo_1}
            alt={event.plan_name}
            loading="lazy"
            />
        </ImageListItem>
        
        ))}
    </ImageList>
  );
};

export default EventsList;
