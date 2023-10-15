import React, { useEffect, useMemo } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";

import parse from "autosuggest-highlight/parse";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_PLACES_API_KEY;

const autocompleteService = { current: null };
const placesService = { current: null };

function loadScript(src, callback) {
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", "google-maps");
  script.src = src;
  script.onload = callback;
  document.body.appendChild(script);
}

export default function MapsAutocomplete({ onSelectedPlace }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&language=en`,
        () => {
          autocompleteService.current =
            new window.google.maps.places.AutocompleteService();
          placesService.current = new window.google.maps.places.PlacesService(
            document.createElement("div"),
          );
        },
      );
    }
  }, []);

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handlePlaceChange = (event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);

    if (newValue && newValue.place_id && placesService.current) {
      placesService.current.getDetails(
        { placeId: newValue.place_id },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            onSelectedPlace(place);
          }
        },
      );
    }
  };

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={handlePlaceChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
