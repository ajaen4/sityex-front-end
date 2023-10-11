import React from "react";

import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CitiesDropDown = ({ label, citiesList, onChangeCity, selectedCity }) => {
  return (
    <Grid container justifyContent="center" style={{ textAlign: "center" }}>
      <Grid item lg={3} md={3} xs={9}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="citiesDropDown-label" htmlFor="citiesDropDown">
            {label}
          </InputLabel>
          <Select
            labelId="citiesDropDown-label"
            id="citiesDropDown"
            onChange={onChangeCity}
            label={label}
            value={
              citiesList && citiesList.length > 0 ? selectedCity.city_id : ""
            }
          >
            {citiesList !== null &&
              citiesList.sort().map((item) => (
                <MenuItem value={item.city_id} key={item.city_id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CitiesDropDown;
