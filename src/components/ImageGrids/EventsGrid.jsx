import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme
} from "@mui/material";

const EventsGrid = ({ events }) => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [eventsBadImage, setEventsBadImage] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const numColumns = isSmallScreen ? 3 : 5;
  const aspectRatio = 1;

  const handleEventClick = (eventSku) => {
    navigate(`/destination/${selectedCity.city_id}/event/${eventSku}`);
  };

  const handleImageError = (eventSku) => {
    if (!eventsBadImage.includes(eventSku))
      setEventsBadImage([...eventsBadImage, eventSku]);
  };

  const getRowHeight = (width) => {
    const columnWidth = width / numColumns;
    return columnWidth / aspectRatio;
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const eventIndex = rowIndex * numColumns + columnIndex;
    const event = events[eventIndex];

    if (!event) return null;

    const isError = eventsBadImage.includes(event.sku);
    const imgSrc = isError
      ? "https://sityex-public-images.s3.eu-west-1.amazonaws.com/square_big_logo_blue.png"
      : event.photo_1;

    return (
      <div style={style}>
        <ImageListItem
          key={isError ? `error-${event.sku}` : event.sku}
          onClick={() => handleEventClick(event.sku)}
        >
          <img
            srcSet={imgSrc}
            src={imgSrc}
            alt={event.plan_name}
            loading="lazy"
            onError={() => handleImageError(event.sku)}
          />
          <ImageListItemBar
            title={
              <div
                style={{
                  whiteSpace: "normal",
                  lineHeight: "1.2rem",
                  maxHeight: "2.4rem",
                  fontSize: "0.8rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {event.plan_name}
              </div>
            }
            onClick={() => handleEventClick(event.sku)}
          />
        </ImageListItem>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          columnCount={numColumns}
          columnWidth={width / numColumns}
          height={height}
          rowCount={Math.ceil(events.length / numColumns)}
          rowHeight={getRowHeight(width)}
          width={width}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
};

export default EventsGrid;