import React, { forwardRef } from "react";

import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const SingleSelect = forwardRef(({ onChange, value, options, label }, ref) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} ref={ref} />}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

SingleSelect.displayName = "SingleSelect";

export default SingleSelect;
