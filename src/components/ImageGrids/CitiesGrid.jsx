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
} from "@mui/material";

import { imagesCdn } from "constants/constants";

const CitiesGrid = ({}) => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);
  const [cityIdsBadImage, setCityIdsBadImage] = useState([]);

  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const numColumns = isSmallScreen ? 2 : 4;
  const aspectRatio = 1.5;

  const handleCityClick = (city_id) => {
    router.push(`/destination/${city_id}`);
  };

  const handleImageError = (city_id) => {
    if (!cityIdsBadImage.includes(city_id))
      setCityIdsBadImage([...cityIdsBadImage, city_id]);
  };

  const getRowHeight = (width) => {
    const columnWidth = width / numColumns;
    return columnWidth / aspectRatio;
  };

  if (!citiesIndex) return null;

  const cities = [...citiesIndex.cities].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const cityIndex = rowIndex * numColumns + columnIndex;
    const city = cities[cityIndex];

    if (!city) return null;

    const isError = cityIdsBadImage.includes(city.city_id);

    const imgSrc = isError
      ? `${imagesCdn}/logos/black_big_logo_blue.png`
      : `${imagesCdn}/cities/${city.city_id}.jpg`;

    return (
      <div style={{ ...style, padding: 1 }}>
        <ImageListItem
          key={city.city_id}
          onClick={() => handleCityClick(city.city_id)}
          style={{
            cursor: "pointer",
          }}
        >
          <img
            src={imgSrc}
            alt={city.name}
            title={city.name}
            onError={() => handleImageError(city.city_id)}
          />
          <ImageListItemBar
            title={
              <div
                style={{
                  whiteSpace: "normal",
                  lineHeight: "0.9rem",
                  maxHeight: "2.4rem",
                  fontSize: "0.8rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
              >
                {city.name}
              </div>
            }
            onClick={() => handleCityClick(city.city_id)}
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
          height={Math.ceil(cities.length / numColumns) * getRowHeight(width)}
          rowCount={Math.ceil(cities.length / numColumns)}
          rowHeight={getRowHeight(width)}
          width={width}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
};

export default CitiesGrid;
