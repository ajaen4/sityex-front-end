"use client";

import React, { useEffect } from "react";

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

const defaultValues = {
  propertyType: [],
  furniture: [],
  totalSize: [],
  facilities: [],
  amenities: [],
};

const HousingFilters = () => {
  const { register, watch, control } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => onSubmit(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    console.log(data);
  };

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
            md={2.5}
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
            md={2.5}
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
          <Grid item xs={6} md={2.5}>
            <Controller
              name="propertyType"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    "Studio",
                    "Apartment",
                    "Private room",
                    "Shared room",
                    "Student residence",
                  ]}
                  label="Property type"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Controller
              name="furniture"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={["Furnished", "Unfurnished"]}
                  label="Furniture"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Controller
              name="totalSize"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    "15 m2 or more",
                    "30 m2 or more",
                    "60 m2 or more",
                    "90 m2 or more",
                  ]}
                  label="Total size"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Controller
              name="facilities"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    "Private bathroom",
                    "Balcony/terrace",
                    "Garden",
                    "Kitchen",
                    "Parking",
                    "Pets allowed",
                    "Wheelchair accessible",
                    "Basement",
                  ]}
                  label="Facilities"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <MultipleSelect
                  {...field}
                  options={[
                    "Dishwasher",
                    "Washing machine",
                    "Dryer",
                    "Air conditioning",
                    "Heating",
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
