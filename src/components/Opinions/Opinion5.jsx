import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import { Controller } from "react-hook-form";

const Opinion5 = ({ fieldName, labelName, errorName, control, errors }) => {
  const style = { padding: "0px" };

  return (
    <Container>
      <div>
        <h5
          style={{
            marginBottom: "0px",
            fontSize: "1em"
          }}
        >
          {labelName}
        </h5>
      </div>
      <Grid container justifyContent="center">
        <FormControl component="fieldset" style={style}>
          <Controller
            name={fieldName}
            control={control}
            defaultValue="1"
            render={({ field }) => (
              <RadioGroup {...field} row>
                {["1", "2", "3", "4", "5"].map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
      </Grid>

      {errors[fieldName] && errors[fieldName].type === "required" && (
        <FormHelperText error>
          {"You must introduce the opinion about " +
            (errorName === undefined ? labelName : errorName)}
        </FormHelperText>
      )}
    </Container>
  );
};

export default Opinion5;
