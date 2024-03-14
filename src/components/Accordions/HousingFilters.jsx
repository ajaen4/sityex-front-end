"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  Chip,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import StopPropagation from "components/StopPropagation/StopPropagation";

import MultipleSelect from "components/Selects/MultipleSelect";
import SingleSelect from "components/Selects/SingleSelect";

import { debounce } from "helpers/usefulFunctions";
import { updateHousingFilters } from "actions";
import { defaultHousingFilters } from "constants/constants";
import { updateHousingOrderBy } from "actions";

const HousingFilters = () => {
  const housingFilters = useSelector((state) => state.housing.data.filters);
  const housingOrderBy = useSelector((state) => state.housing.data.orderBy);

  const dispatch = useDispatch();

  const { register, watch, control, reset } = useForm({
    defaultValues: housingFilters,
  });

  const clearFilters = () => {
    reset(defaultHousingFilters);
  };

  const debounceFilters = debounce((data) => {
    dispatch(updateHousingFilters(data));
  }, 500);

  const changeOrderBy = (event) => {
    const value = event.target.value;
    dispatch(updateHousingOrderBy(value));
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      debounceFilters(value),
    );
    return () => subscription.unsubscribe();
  }, [watch, debounceFilters]);

  return (
    <Accordion
      sx={{
        textAlign: "start",
        my: 1,
        width: "95%",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Chip
            label={<b>Filters</b>}
            color="secondary"
            sx={{ mx: 2, py: 0.5 }}
          />
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <FormControl sx={{ width: 140, mr: { xs: 1, md: 2 } }}>
            <InputLabel id="order-by">Order By</InputLabel>
            <StopPropagation>
              <Select
                value={housingOrderBy}
                onChange={changeOrderBy}
                input={
                  <OutlinedInput label="Order By" style={{ width: "100%" }} />
                }
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
            </StopPropagation>
          </FormControl>
        </Box>
      </AccordionSummary>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: { xs: 2, md: 8 }, mb: 2 }}
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </Box>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="partner"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  {...field}
                  options={[
                    { label: "Uniplaces", value: "uniplaces" },
                    { label: "housingAnywhere", value: "housing_anywhere" },
                  ]}
                  label="Partner"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={2.3}
            sx={{ display: "flex", alignItems: "start", py: 1.5 }}
          >
            <TextField
              {...register("minPrice")}
              fullWidth
              label="Min price"
              placeholder="Min price"
              type="number"
              autoComplete="Min price"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={2.3}
            sx={{ display: "flex", alignItems: "start", py: 1.5 }}
          >
            <TextField
              {...register("maxPrice")}
              fullWidth
              label="Max price"
              placeholder="Max price"
              type="number"
              autoComplete="Max price"
            />
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    { label: "Apartment", value: "apartment" },
                    { label: "Building", value: "building" },
                    { label: "House", value: "house" },
                  ]}
                  label="Property type"
                />
              )}
            />
            <Typography sx={{ fontSize: 11 }}>
              **Not applicable to Uniplaces**
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="furniture"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  {...field}
                  options={[
                    { label: "Furnished", value: "furnished" },
                    { label: "Unfurnished", value: "unfurnished" },
                  ]}
                  label="Furniture"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="totalSize"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  {...field}
                  options={[
                    { label: "15 m2 or more", value: 15 },
                    { label: "30 m2 or more", value: 30 },
                    { label: "60 m2 or more", value: 60 },
                    { label: "90 m2 or more", value: 90 },
                  ]}
                  label="Total size"
                />
              )}
            />
            <Typography sx={{ fontSize: 11 }}>
              **Not applicable to Uniplaces**
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="bedrooms"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  {...field}
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4+", value: 4 },
                  ]}
                  label="Bedrooms"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="facilities"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    { label: "Private bathroom", value: "bathroom" },
                    { label: "Balcony/terrace", value: "balconyTerrace" },
                    { label: "Garden", value: "garden" },
                    { label: "Kitchen", value: "kitchen" },
                    { label: "Parking", value: "parking" },
                    { label: "Pets allowed", value: "pets" },
                    {
                      label: "Wheelchair accessible",
                      value: "wheelchairAccessible",
                    },
                    { label: "Basement", value: "basement" },
                  ]}
                  label="Facilities"
                />
              )}
            />
            <Typography sx={{ fontSize: 11 }}>
              **Not applicable to Uniplaces**
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="rentType"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    { label: "Private room", value: "private room" },
                    { label: "Entire place", value: "entire place" },
                    { label: "Shared room", value: "shared room" },
                  ]}
                  label="Rent type"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.3}>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    { label: "Dishwasher", value: "dishwasher" },
                    { label: "Washing machine", value: "washingMachine" },
                    { label: "Dryer", value: "dryer" },
                    { label: "Air conditioning", value: "airConditioning" },
                    { label: "Heating", value: "heating" },
                  ]}
                  label="Amenities"
                />
              )}
            />
            <Typography sx={{ fontSize: 11 }}>
              **Not applicable to Uniplaces**
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default HousingFilters;
