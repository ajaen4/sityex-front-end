import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Typography,
  Button,
  Box,
  useMediaQuery,
  TextField,
  FormHelperText,
  FormControl,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { logInUser, logInUserWithGoogle, logInUserWithFacebook } from "actions";

import StandarModal from "components/Modals/StandarModal";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import Google from "assets/img/icons/social-google.svg";
import Facebook from "assets/img/icons/facebook.png";

import * as ROUTES_PATHS from "routes/paths";

const LogInForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const signInUser = (data) => {
    setIsFetching(true);
    dispatch(logInUser(data))
      .then((user) => {
        console.log(user);
      })
      .catch((errorMessage) => {
        setErrorMessage(errorMessage);
        setIsFetching(false);
        reset();
      });
  };

  const providerHandler = (providerAction) => {
    return async () => {
      dispatch(providerAction()).then(
        (user) => {},
        (errorMessage) => {
          setErrorMessage(errorMessage);
        }
      );
    };
  }

  if (isFetching) return <CenteredLoadingSpinner />;

  return (
    <>
      <Grid item xs={12}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Button
              disableElevation
              fullWidth
              onClick={providerHandler(logInUserWithGoogle)}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  style={{ marginTop: 6 }}
                />
              </Box>
              Sign in with Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              disableElevation
              fullWidth
              onClick={providerHandler(logInUserWithFacebook)}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2 } }}>
                <img
                  src={Facebook}
                  alt="facebook"
                  width={20}
                  style={{ marginTop: 6 }}
                />
              </Box>
              Sign in with Facebook
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex"
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
                  borderRadius: "14px"
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
              Sign in with Email address
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(signInUser)}
              noValidate
              sx={{
                mt: 1,
                width: "83%"
              }}
            >
              <FormControl fullWidth error={Boolean(errors.email)}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  placeholder="Email..."
                  type="email"
                  autoComplete="email"
                  autoFocus
                  InputProps={{
                    style: { fontSize: 16 }
                  }}
                  error={errors.email !== undefined}
                  {...register("email", {
                    required: "You must provide your email",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "The email doesn't have a valid format"
                    }
                  })}
                />
                <FormHelperText style={{ minHeight: "30px" }}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth error={Boolean(errors.password)}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password..."
                  autoComplete="current-password"
                  InputProps={{
                    style: { fontSize: 16 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...register("password", {
                    required: "The password is required",
                    minLength: {
                      value: 8,
                      message: "The password must have at least 8 characters"
                    }
                  })}
                />
                <FormHelperText style={{ minHeight: "30px" }}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <Button
                disabled={Object.keys(errors).length !== 0}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
              >
                Log In
              </Button>
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
            href={ROUTES_PATHS.SIGN_UP}
            variant="subtitle1"
            sx={{ textDecoration: "none" }}
          >
            Don&apos;t have an account?
          </Link>
        </Grid>
      </Grid>
      {errorMessage !== null && (
        <StandarModal
          color="error"
          title={"Incorrect authentication. "}
          message={errorMessage.message}
        />
      )}
    </>
  );
};

export default LogInForm;
