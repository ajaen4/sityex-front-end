import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  useMediaQuery,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Google from "assets/img/icons/social-google.svg";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import StandarModal from "components/Modals/StandarModal";
import { createUser, logInUserWithGoogle } from "actions";
import { sameAs } from "helpers/validators";

import * as ROUTES_PATHS from "routes/paths";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const signUpUser = (data) => {
    setIsFetching(true);
    dispatch(createUser(data)).then(
      (user) => {
        setIsFetching(false);
      },
      (error) => {
        setErrorMessage(error);
        setIsFetching(false);
      },
    );
  };

  const signUpUserGoogle = async () => {
    dispatch(logInUserWithGoogle()).then(
      (user) => {},
      (error) => {
        setErrorMessage(error);
      },
    );
  };

  if (isFetching) return <CenteredLoadingSpinner />;

  return (
    <>
      <Grid item xs={12}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Button
              disableElevation
              fullWidth
              onClick={signUpUserGoogle}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Sign Up with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

              <Button
                variant="outlined"
                sx={{
                  cursor: "unset",
                  m: 2,
                  py: 0.5,
                  px: 7,
                  borderColor: `${theme.palette.grey[100]} !important`,
                  color: `${theme.palette.grey[900]}!important`,
                  fontWeight: 500,
                  borderRadius: "14px",
                }}
                disableRipple
                disabled
              >
                OR
              </Button>

              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle1">
              Sign up with Email address
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(signUpUser)}
              noValidate
              sx={{
                mt: 1,
                width: "80%",
              }}
            >
              <FormControl fullWidth error={Boolean(errors.email)}>
                <TextField
                  {...register("email", {
                    required: "The email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "El formato del email no es valido",
                    },
                  })}
                  label="Email"
                  variant="outlined"
                />
                <FormHelperText style={{ minHeight: "20px" }}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.userName)}>
                <TextField
                  {...register("userName", {
                    required: "The username is reuquired",
                  })}
                  label="Nombre de usuario"
                  variant="outlined"
                  autoComplete="username"
                />
                <FormHelperText style={{ minHeight: "20px" }}>
                  {errors.userName?.message}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.password)}>
                <TextField
                  {...register("password", {
                    required: "The password is required",
                    minLength: {
                      value: 8,
                      message: "The password must have at least 8 characters",
                    },
                  })}
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  autoComplete="new-password"
                />
                <FormHelperText style={{ minHeight: "20px" }}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.confirmPassword)}>
                <TextField
                  {...register("confirmPassword", {
                    required: "The password is required",
                    minLength: {
                      value: 8,
                      message: "The password must have at least 8 characters",
                    },
                    validate: {
                      sameAs: (value) =>
                        sameAs(getValues, "password")(value) ||
                        "Las contraseñas deben de ser iguales",
                    },
                  })}
                  label="Confirmación de Contraseña"
                  variant="outlined"
                  type="password"
                  autoComplete="new-password"
                />
                <FormHelperText style={{ minHeight: "20px" }}>
                  {errors.confirmPassword?.message}
                </FormHelperText>
              </FormControl>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "2%", width: "100%" }}
                >
                  Create account
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid item container direction="column" alignItems="center" xs={12}>
          <Link
            href={ROUTES_PATHS.LOG_IN}
            variant="subtitle1"
            sx={{ textDecoration: "none" }}
          >
            Already have an account?
          </Link>
        </Grid>
      </Grid>
      {errorMessage !== null && (
        <StandarModal
          color="error"
          style={{
            marginTop: "15px",
          }}
          title={"Incorrect authentication. "}
          message={errorMessage.message}
        />
      )}
    </>
  );
};

export default SignUpForm;
