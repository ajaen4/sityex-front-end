import React from "react";

import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";

const MultipleSelect = React.forwardRef(
  ({ onChange, value, options, label }, ref) => {
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
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) =>
            selected
              .map(
                (selectedValue) =>
                  options.find((option) => option.value === selectedValue)
                    ?.label || selectedValue,
              )
              .join(", ")
          }
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={value.includes(option.value)} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);

export default MultipleSelect;
