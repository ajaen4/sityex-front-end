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
      <div>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            value={value}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(", ")}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={value.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  },
);

export default MultipleSelect;
