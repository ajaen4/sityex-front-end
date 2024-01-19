"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  IconButton,
  InputAdornment,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import LoadingSpinner from "components/Spinner/LoadingSpinner";

const CitiesAutocomplete = ({ selectedCity, placeholder }) => {
  const citiesIndex = useSelector((state) => state.citiesIndex.data);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const filterOptions = createFilterOptions({
    limit: isSmallScreen ? 20 : 50,
  });

  const getDestinations = (cities) => {
    if (cities) {
      return [...cities].sort((a, b) => a.name.localeCompare(b.name));
    } else return [];
  };

  const onSelectCity = (event, value) => {
    router.push(`/destination/${value.city_id}`);
    setIsLoading(true);
  };

  const cities = citiesIndex ? citiesIndex.cities : [];

  return (
    <Autocomplete
      options={getDestinations(cities)}
      onChange={onSelectCity}
      getOptionLabel={(option) => option.name}
      filterOptions={filterOptions}
      renderInput={(params) => {
        if (isLoading) {
          return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingSpinner />
            </Box>
          );
        } else
          return (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    {selectedCity && (
                      <IconButton>
                        <img
                          width="20"
                          src={`https://flagcdn.com/w20/${selectedCity.country_2_code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${selectedCity.country_2_code.toLowerCase()}.png 2x`}
                          alt="country flag"
                        />
                      </IconButton>
                    )}
                    {!selectedCity && <SearchIcon />}
                  </InputAdornment>
                ),
                style: { fontSize: 16 },
              }}
              placeholder={(selectedCity && selectedCity.name) || placeholder}
              fullWidth
            />
          );
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.city_id}
        >
          <img
            width="20"
            src={`https://flagcdn.com/w20/${option.country_2_code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.country_2_code.toLowerCase()}.png 2x`}
            alt={option.name}
            key={option.city_id}
          />
          {option.name}
        </Box>
      )}
    />
  );
};

export default CitiesAutocomplete;
