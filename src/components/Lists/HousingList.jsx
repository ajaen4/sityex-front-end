import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import { useMediaQuery, useTheme } from "@mui/material";

import HousingListing from "components/Cards/HousingListing";

function renderRow(props) {
  const { index, style, data } = props;
  const item = data[index];

  return (
    <div
      key={item.housing_id}
      style={{ ...style, display: "flex", justifyContent: "center" }}
    >
      <HousingListing listing={item} />
    </div>
  );
}

export default function HousingList({ pageNum }) {
  const listRef = useRef();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const housingIndex = useSelector((state) => state.housing.data);

  const itemSize = isSmallScreen ? 530 : 255;
  const itemsPerPage = 30;
  const slicedData = housingIndex.listings.slice(
    (pageNum + 1) * itemsPerPage,
    (pageNum + 2) * itemsPerPage,
  );
  const actualItemCount = slicedData.length;

  const updateHeight = () => {
    if (listRef.current) {
      const offsetTop = listRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setHeight(windowHeight - offsetTop);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <FixedSizeList
      height={itemSize * actualItemCount}
      width="100%"
      itemSize={itemSize}
      itemData={slicedData}
      itemCount={actualItemCount}
      overscanCount={10}
    >
      {renderRow}
    </FixedSizeList>
  );
}
