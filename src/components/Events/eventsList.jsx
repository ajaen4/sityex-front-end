import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { ImageListItem, useMediaQuery } from "@mui/material";

const EventsList = ({ events }) => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleEventClick = (eventSku) => {
    navigate(`/destination/${selectedCity.city_id}/event/${eventSku}`);
  };

  // Grid cell renderer
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const event = events[rowIndex * (isSmallScreen ? 3 : 5) + columnIndex];
    if (!event) {
      return null;
    }

    return (
      <div style={style}>
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
      </div>
    );
  };

  return (
    <AutoSizer style={{ marginBottom: 1 }}>
      {({ height, width }) => (
        <Grid
          columnCount={isSmallScreen ? 3 : 5}
          columnWidth={width / (isSmallScreen ? 3 : 5)}
          height={height}
          rowCount={Math.ceil(events.length / (isSmallScreen ? 3 : 5))}
          rowHeight={isSmallScreen ? 124 : isMediumScreen ? 180 : 195}
          width={width}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
};

export default EventsList;
