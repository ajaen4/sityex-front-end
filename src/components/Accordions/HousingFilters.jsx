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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";

import MultipleSelect from "components/Selects/MultipleSelect";
import SingleSelect from "components/Selects/SingleSelect";

import { debounce } from "helpers/usefulFunctions";
import { updateHousingFilters } from "actions";

const HousingFilters = () => {
  const housingFilters = useSelector((state) => state.housing.data.filters);

  const { register, watch, control } = useForm({
    defaultValues: housingFilters,
  });

  const dispatch = useDispatch();

  const debounceFilters = debounce((data) => {
    dispatch(updateHousingFilters(data));
  }, 500);

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
        <b>Filters</b>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid
            item
            xs={6}
            md={2.3}
            sx={{ display: "flex", textAlign: "center", alignItems: "center" }}
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
            sx={{ display: "flex", textAlign: "center", alignItems: "center" }}
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
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default HousingFilters;
