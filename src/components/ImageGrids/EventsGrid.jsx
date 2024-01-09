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

import { imagesCdn } from "constants/constants";

const EventsGrid = ({ events }) => {
  const auth = useSelector((state) => state.auth);
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [eventsBadImage, setEventsBadImage] = useState([]);

  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const numColumns = isSmallScreen ? 3 : 5;
  const aspectRatio = 1;

  const handleEventClick = (eventSku) => {
    router.push(`/destination/${selectedCity.city_id}/event/${eventSku}`);
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
    const [interestedCount, setInterestedCount] = useState(null);

    if (!event) return null;

    useEffect(() => {
      countInterestedUsers(selectedCity.city_id, event.sku, auth.data?.id).then(
        (interestedCount) => {
          setInterestedCount(interestedCount);
        },
      );
    }, [event]);

    const isError = eventsBadImage.includes(event.sku);
    const imgSrc = isError
      ? `${imagesCdn}/logos/square_black_big_logo_blue.png`
      : event.photo_1;

    const key = isError
      ? `error-${event.sku}-${rowIndex}-${columnIndex}`
      : `${event.sku}-${rowIndex}-${columnIndex}`;

    const plan_name = event.plan_name_en !== "" ? event.plan_name_en : event.plan_name_es;

    return (
      <div style={style}>
        <ImageListItem
          key={key}
          onClick={() => handleEventClick(event.sku)}
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
              onError={() => handleImageError(event.sku)}
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
