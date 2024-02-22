"use client";

import React, { useEffect, useState } from "react";
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

import { countInterestedUsers } from "actions";

import { useShowBotNavContext } from "components/Contexts/ShowBotNavContext";

import { imagesCdn, minBottomNavHeight } from "constants/constants";

const EventsGrid = ({ events }) => {
  const auth = useSelector((state) => state.auth);
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [eventsBadImage, setEventsBadImage] = useState([]);
  const { showBotNav } = useShowBotNavContext();

  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const numColumns = isSmallScreen ? 3 : 5;
  const aspectRatio = 1;

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
    const [interestedCount, setInterestedCount] = useState(null);

    useEffect(() => {
      if (!event) {
        return;
      }

      countInterestedUsers(
        selectedCity.city_id,
        event.event_id,
        auth.data?.id,
      ).then((interestedCount) => {
        setInterestedCount(interestedCount);
      });
    }, [event]);

    if (!event) {
      return null;
    }

    const isError = eventsBadImage.includes(event.event_id);

    let imgSrc = null;
    if (event.partner === "sityex") {
      imgSrc = `${imagesCdn}/${event.photo_1}`;
    } else {
      imgSrc = event.photo_1;
    }

    if (isError) {
      imgSrc = `${imagesCdn}/logos/square_black_big_logo_blue.png`;
    }

    const key = isError
      ? `error-${event.event_id}-${rowIndex}-${columnIndex}`
      : `${event.event_id}-${rowIndex}-${columnIndex}`;

    const plan_name =
      event.plan_name_en !== "" ? event.plan_name_en : event.plan_name_es;

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
              alt={plan_name}
              title={plan_name}
              loading="lazy"
              onError={() => handleImageError(event.event_id)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {interestedCount !== null && interestedCount !== 0 && (
              <Chip
                label={`${interestedCount} users interested`}
                color="secondary"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 4,
                  fontSize: {
                    xs: "0.6rem",
                    md: "0.8rem",
                  },
                }}
              />
            )}
          </div>
          <ImageListItemBar
            title={
              <div
                style={{
                  whiteSpace: "normal",
                  lineHeight: "1.2rem",
                  maxHeight: "2.4rem",
                  fontSize: "0.8rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {plan_name}
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
