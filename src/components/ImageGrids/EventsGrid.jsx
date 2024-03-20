"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";

import { useShowBotNavContext } from "components/Contexts/ShowBotNavContext";

import { formatDate } from "helpers/usefulFunctions";
import { imagesCdn, minBottomNavHeight } from "constants/constants";

const now = new Date();

const EventsGrid = ({ events }) => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [eventsBadImage, setEventsBadImage] = useState([]);
  const { showBotNav } = useShowBotNavContext();

  const theme = useTheme();
  const router = useRouter();


  const aspectRatio = 1.77;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg")) && !isSmallScreen;
  const isPC = !isSmallScreen && !isTablet;

  let numColumns = null;
  let maxCharDesc = null;

  if (isSmallScreen){
    numColumns = 1;
    maxCharDesc = 50;
  }
  else if (isTablet){
    numColumns = 2;
    maxCharDesc = 60;
  }
  else if (isPC){
    numColumns = 3;
    maxCharDesc = 70;
  }
  

  const handleEventClick = (eventId) => {
    router.push(`/services/${selectedCity.city_id}/event/${eventId}`);
  };

  const handleImageError = (eventId) => {
    if (!eventsBadImage.includes(eventId))
      setEventsBadImage([...eventsBadImage, eventId]);
  };

  const getRowHeight = (width) => {
    const columnWidth = width / numColumns;
    return columnWidth / aspectRatio;
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const eventIndex = rowIndex * numColumns + columnIndex;
    const event = events[eventIndex];

    if (!event) {
      return null;
    }

    const eventDate = new Date(event.timestamp);
    const isError = eventsBadImage.includes(event.event_id);
    let imgSrc = event.image_url;

    const goingText = eventDate < now ? "went" : "going";

    if (isError) {
      imgSrc = `${imagesCdn}/logos/square_black_big_logo_blue.png`;
    }

    const key = isError
      ? `error-${event.event_id}-${rowIndex}-${columnIndex}`
      : `${event.event_id}-${rowIndex}-${columnIndex}`;

    return (
      <div style={style}>
        <ImageListItem
          key={key}
          onClick={() => handleEventClick(event.event_id)}
          style={{
            height: "100%",
            cursor: "pointer",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              srcSet={imgSrc}
              src={imgSrc}
              alt={event.title}
              title={event.title}
              loading="lazy"
              onError={() => handleImageError(event.event_id)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Chip
                label={`${event.going_count} ${goingText}`}
                color="secondary"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: "0.8rem",
                }}
              />
          </div>
          <ImageListItemBar
            title={
              <div
                style={{
                  whiteSpace: "normal",
                  lineHeight: "1.2rem",
                  maxHeight: "3.5rem",
                  fontSize: "0.8rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {event.title}
                <br />
                {formatDate(eventDate)}
                <br />
                {event.description.slice(0, maxCharDesc)}
                ...
              </div>
            }
            onClick={() => handleEventClick(event.event_id)}
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
          height={
            Math.ceil(events.length / numColumns) * getRowHeight(width) +
            (showBotNav ? minBottomNavHeight : 0)
          }
          rowCount={Math.ceil(events.length / numColumns)}
          rowHeight={getRowHeight(width)}
          width={width}
          style={{ overflow: "hidden" }}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
};

export default EventsGrid;
