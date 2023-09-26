import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";

const Opinion2 = ({
  icon,
  labelName,
  name1,
  name2,
  option1,
  option2,
  onChange,
  register,
  errors,
}) => {
  const className = "now-ui-icons " + icon;

  return (
    <>
      <Container sx={{ marginTop: "40px" }}>
        <div className="rowMainCharact">
          <i
            className={className}
            style={{
              marginTop: "5px",
              marginRight: "5px",
            }}
          ></i>
          <h5
            style={{
              marginBottom: "0px",
            }}
          >
            {labelName}
          </h5>
        </div>
        <FormControl component="fieldset">
          <FormLabel component="legend">{labelName}</FormLabel>
          <RadioGroup
            aria-label={labelName}
            defaultValue={name1}
            name={labelName}
            onChange={onChange}
          >
            <FormControlLabel
              value={name1}
              control={
                <Radio
                  inputRef={register({
                    required: true,
                  })}
                />
              }
              label={option1}
            />
            <FormControlLabel
              value={name2}
              control={
                <Radio
                  inputRef={register({
                    required: true,
                  })}
                />
              }
              label={option2}
            />
          </RadioGroup>
        </FormControl>
      </Container>
      {errors[labelName] && errors[labelName].type === "required" && (
        <FormHelperText error>
          {"You must introduce the opinion about " + labelName}
        </FormHelperText>
      )}
    </>
  );
};

export default Opinion2;
