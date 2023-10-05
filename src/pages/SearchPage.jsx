import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { withAuth } from "session";

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const SearchPage = () => {
  const navigate = useNavigate();

  const citiesIndex = useSelector((state) => state.citiesIndex.data);

  useEffect(() => {
    document.title = "Search Page";
  }, []);

  const onSearchChange = (event, value) =>
    navigate("/destination/" + value.cityName + "/community");

  const getDestinations = () => {
    if (citiesIndex !== null)
      return Object.values(citiesIndex)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cityData) => ({
          cityName: cityData.name,
          countryCode: cityData.countryCode,
        }));
    else return [];
  };

  return (
    <Box
      style={{
        textAlign: "center",
        justifyContent: "center",
        minHeight: "76vh",
      }}
    >
      <Grid container spacing={1} sx={{ justifyContent: "center", my: 5 }}>
        <Grid item xs={11} md={5} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h2" color="textSecondary">
                Introduce a destination
              </Typography>
              <Autocomplete
                freeSolo
                style={{ marginTop: "20px" }}
                options={getDestinations()}
                onChange={onSearchChange}
                getOptionLabel={(option) => option.cityName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <TravelExploreIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Ej. Turin..."
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.cityName}
                  </Box>
                )}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(SearchPage);
