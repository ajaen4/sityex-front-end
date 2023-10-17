import React from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { Box } from "@mui/material";

const TextArea = ({ name, register, errors }) => {
  return (
    <>
      <TextField
        {...register(name, {
          required: true,
          maxLength: 300,
          pattern:
            /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð !¡?¿:,.()'-]+$/u
        })}
        style={{
          fontSize: "large"
        }}
        variant="outlined"
        id={name}
        name={name}
        rows={5}
        fullWidth
        multiline
        error={errors[name] !== undefined}
        InputProps={{
          style: { fontSize: 16 }
        }}
      />
      <Box sx={{ minHeight: 40 }}>
        {errors[name] && errors[name].type === "required" && (
          <FormHelperText error>
            You must introduce at least one advice
          </FormHelperText>
        )}
        {errors[name] && errors[name].type === "maxLength" && (
          <FormHelperText error>
            {"The " + name + " can have max 300 characters"}
          </FormHelperText>
        )}
        {errors[name] && errors[name].type === "pattern" && (
          <FormHelperText error>Delete non allowed characters</FormHelperText>
        )}
      </Box>
    </>
  );
};

export default TextArea;
