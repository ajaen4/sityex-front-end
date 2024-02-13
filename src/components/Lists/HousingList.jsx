import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FixedSizeList } from "react-window";
import {
  useMediaQuery,
  useTheme,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Pagination,
} from "@mui/material";

import HousingListing from "components/Cards/HousingListing";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import { fetchHousingPage } from "actions";
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
  const dispatch = useDispatch();

  const [orderBy, setOrderBy] = useState("housing_id");
  const [pageNum, setPageNum] = useState(1);

  const pagesListings = useSelector(
    (state) => state.housing.data.pagesListings,
  );
  const housingState = useSelector((state) => state.housing);
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const itemSize = isSmallScreen ? 530 : 255;
  const numPages =
    pagesListings.length > housingPageSize
      ? Math.floor(pagesListings.length / housingPageSize) - 1
      : 1;

  const updateHeight = () => {
    if (listRef.current) {
      const offsetTop = listRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setHeight(windowHeight - offsetTop);
    }
  };

  useEffect(() => {
    if (housingState.data.orderBy !== orderBy) {
      dispatch(fetchHousingPage(selectedCity.city_id, orderBy));
    }
  }, [orderBy]);

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const changeOrderBy = (event, orderBy) => {
    setOrderBy(orderBy);
  };

  const changePage = (event, value) => {
    setPageNum(value);
  };

  if (housingState.isFetching) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <Box>
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
          page={pageNum}
          onChange={changePage}
        />
        <Typography variant="h5" sx={{ mx: 1 }}>
          Order by:
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={orderBy}
          exclusive
          onChange={changeOrderBy}
          aria-label="orderBy"
          size="small"
        >
          <ToggleButton value="rank">Rank</ToggleButton>
          <ToggleButton value="price">Price</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {pagesListings.length > 0 && (
          <FixedSizeList
            height={itemSize * housingPageSize}
            width="100%"
            itemSize={itemSize}
            itemData={pagesListings.slice(
              (pageNum - 1) * housingPageSize,
              pageNum * housingPageSize,
            )}
            itemCount={housingPageSize}
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
        }}
      >
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
            page={pageNum}
            onChange={changePage}
          />
          <Typography variant="h5" sx={{ mx: 1 }}>
            Order by:
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={orderBy}
            exclusive
            onChange={changeOrderBy}
            aria-label="orderBy"
            size="small"
          >
            <ToggleButton value="rank">Rank</ToggleButton>
            <ToggleButton value="price">Price</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
