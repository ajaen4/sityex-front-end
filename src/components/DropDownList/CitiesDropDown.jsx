import React from "react"

// MUI v5 components
import Grid from "@mui/material/Grid"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

// Custom functionality
import { prettyCity } from "helpers/usefulFunctions"

const CitiesDropDown = ({ label, citiesList, onChangeCity, selectedCity }) => {


  return (
    <Grid container justifyContent="center" style={{ textAlign: "center" }}>
      <Grid item lg={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="citiesDropDown-label" htmlFor="citiesDropDown">
            {label}
          </InputLabel>
          <Select
            labelId="citiesDropDown-label"
            id="citiesDropDown"
            onChange={onChangeCity}
            label={label}
            value={citiesList && citiesList.length > 0 ? selectedCity : ""}
          >
            {citiesList !== null &&
              citiesList.sort().map((item) => (
                <MenuItem value={item} key={item}>
                  {prettyCity(item)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CitiesDropDown
