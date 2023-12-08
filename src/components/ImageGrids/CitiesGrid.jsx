import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme
} from "@mui/material";

import { data_bucket_url } from "constants/constants";

const CitiesGrid = ({ citiesIndex }) => {
  const [cityIdsBadImage, setCityIdsBadImage] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const numColumns = isSmallScreen ? 2 : 4;
  const aspectRatio = 1.5;

  const handleCityClick = (city_id) => {
    navigate(`/destination/${city_id}/events`);
  };

  const handleImageError = (city_id) => {
    if (!cityIdsBadImage.includes(city_id))
      setCityIdsBadImage([...cityIdsBadImage, city_id]);
  };

  const getRowHeight = (width) => {
    const columnWidth = width / numColumns;
    return columnWidth / aspectRatio;
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const cityIndex = rowIndex * numColumns + columnIndex;
    const city = citiesIndex[cityIndex];

    if (!city) return null;

    const isError = cityIdsBadImage.includes(city.city_id);

    const imgSrc = isError
      ? `${data_bucket_url}/logos/black_big_logo_blue.png`
      : `${data_bucket_url}/cities/${city.city_id}.jpg`;

    return (
      <div style={{ ...style, padding: 1 }}>
        <ImageListItem
          key={city.city_id}
          onClick={() => handleCityClick(city.city_id)}
          style={{
            cursor: "pointer"
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
                  textAlign: "center"
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
          height={
            Math.ceil(citiesIndex.length / numColumns) * getRowHeight(width)
          }
          rowCount={Math.ceil(citiesIndex.length / numColumns)}
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
