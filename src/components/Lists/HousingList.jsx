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
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
} from "@mui/material";

import HousingListing from "components/Cards/HousingListing";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import { fetchHousingListings, updateHousingOrderBy } from "actions";
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

  const [orderBy, setOrderBy] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const filteredHListings = useSelector(
    (state) => state.housing.data.filteredHListings,
  );
  const housingState = useSelector((state) => state.housing);
  const selectedCity = useSelector((state) => state.selectedCity.data);

  const itemSize = isSmallScreen ? 530 : 255;
  const numPages =
    filteredHListings.length > housingPageSize
      ? Math.floor(filteredHListings.length / housingPageSize) - 1
      : 1;
  const validatedPageNum = pageNum > numPages ? numPages : pageNum;
  const itemCount =
    filteredHListings.length >= housingPageSize
      ? housingPageSize
      : filteredHListings.length;

  const updateHeight = () => {
    if (listRef.current) {
      const offsetTop = listRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setHeight(windowHeight - offsetTop);
    }
  };

  useEffect(() => {
    if (housingState.data.housingListings.length === 0) {
      dispatch(fetchHousingListings(selectedCity.city_id));
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const changeOrderBy = (event) => {
    const value = event.target.value;
    setOrderBy(value);
    dispatch(updateHousingOrderBy(value));
  };

  const changePage = (_, value) => {
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
        <FormControl sx={{ width: 140 }}>
        <InputLabel id="order-by">Order By</InputLabel>
        <Select
          value={orderBy}
          onChange={changeOrderBy}
          input={<OutlinedInput label="Order By" />}
        >
          <MenuItem key="rank" value="rank">
              Rank
          </MenuItem>
          <MenuItem key="low-price" value="low-price">
              Lowest price
          </MenuItem>
          <MenuItem key="high-price" value="high-price">
              Highest price
          </MenuItem>
        </Select>
        </FormControl>
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
            itemData={filteredHListings.slice(
              (validatedPageNum - 1) * housingPageSize,
              validatedPageNum * housingPageSize,
            )}
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
        }}
      >
        {filteredHListings.length > housingPageSize && <Box
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
        </Box>}
      </Box>
    </Box>
  );
}
