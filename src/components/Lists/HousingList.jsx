import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import { useMediaQuery, useTheme, Box, Pagination } from "@mui/material";

import HousingListing from "components/Cards/HousingListing";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import { housingPageSize } from "constants/constants";

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

export default function HousingList() {
  const listRef = useRef();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const filteredHListings = useSelector(
    (state) => state.housing.data.filteredHListings,
  );
  const housingState = useSelector((state) => state.housing);
  const [pageNum, setPageNum] = useState(1);

  const itemSize = isSmallScreen ? 530 : 255;
  const numPages =
    filteredHListings.length > housingPageSize
      ? Math.ceil(filteredHListings.length / housingPageSize)
      : 1;
  const validatedPageNum = pageNum > numPages ? numPages : pageNum;
  const itemData = filteredHListings.slice(
    (validatedPageNum - 1) * housingPageSize,
    validatedPageNum * housingPageSize,
  );
  const itemCount = itemData.length;

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

  const changePage = (_, value) => {
    setPageNum(value);
  };

  if (housingState.isFetching) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          mr: { xs: 1, md: 10 },
          mt: 2.5,
        }}
      >
        <Pagination
          count={numPages}
          siblingCount={0}
          boundaryCount={1}
          size="small"
          page={validatedPageNum}
          onChange={changePage}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {filteredHListings.length > 0 && (
          <FixedSizeList
            height={itemSize * itemCount}
            width="100%"
            itemSize={itemSize}
            itemData={itemData}
            itemCount={itemCount}
            overscanCount={10}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
          minHeight: { xs: 110, md: 0 },
          pb: { xs: 8, md: 0 },
        }}
      >
        {filteredHListings.length > housingPageSize && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              mr: { xs: 1, md: 10 },
              my: 1,
            }}
          >
            <Pagination
              count={numPages}
              siblingCount={0}
              boundaryCount={1}
              size="small"
              page={validatedPageNum}
              onChange={changePage}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}
