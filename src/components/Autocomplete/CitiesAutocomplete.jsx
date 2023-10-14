import React from "react";

import {
  IconButton,
  InputAdornment,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CitiesAutocomplete = ({ selectedCity, citiesIndex, onChangeCity }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const filterOptions = createFilterOptions({
    limit: isSmallScreen ? 50 : 1000,
  });

  const getDestinations = () => {
    if (citiesIndex !== null)
      return citiesIndex.sort((a, b) => a.name.localeCompare(b.name));
    else return [];
  };

  return (
    <Autocomplete
      freeSolo
      options={getDestinations()}
      onChange={onChangeCity}
      getOptionLabel={(option) => option.name}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {selectedCity ? 
                  <IconButton>
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${selectedCity.country_2_code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${selectedCity.country_2_code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                  </IconButton>
                : <IconButton>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/cn.png`}
                  srcSet={`https://flagcdn.com/w40/cn.png 2x`}
                  alt=""
                />
              </IconButton>
              }
              </InputAdornment>
            ),
          }}
          placeholder={selectedCity ? selectedCity.name : "Acheng"}
          fullWidth
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.city_id}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.country_2_code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.country_2_code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.name}
        </Box>
      )}
    />
  );
};

export default CitiesAutocomplete;
