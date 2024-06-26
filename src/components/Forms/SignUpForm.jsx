"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getRedirectResult } from "firebase/auth";

import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  useMediaQuery,
  Divider,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import StandarModal from "components/Modals/StandarModal";
import LoadingSpinner from "components/Spinner/LoadingSpinner";

import { createUser, logInUserWithGoogle, storeAuthUser } from "actions";
import { sameAs } from "helpers/validators";

import * as api from "api";
import { auth } from "baas";

const Google = "/social-google.svg";

const SignUpForm = ({}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [errorMessage, setErrorMessage] = useState(null);
  const [signedUpMessage, setSignedUpMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [allCountries, setAllCountries] = useState([]);

  const resetForm = () => {
    reset({
      email: "",
      userName: "",
      homeCountry3Code: "",
      password: "",
      confirmPassword: "",
    });
  };

  const signUpUser = (data) => {
    createUser(data).then(
      (user) => {
        setIsFetching(false);
        setSignedUpMessage(
          "Verify your email to be able to log in. Remember to check your spam folder!",
        );
        resetForm();
      },
      (error) => {
        setIsFetching(false);
        setErrorMessage(error);
      },
    );
    setIsFetching(true);
  };

  const onClickGoogleAuth = () => {
    setIsFetching(true);
    logInUserWithGoogle();
  };

  useEffect(() => {
    api.getCountries().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && isFetching) {
          const user = result.user;
          const dbUser = {
            uid: user.uid,
            email: user.email,
            userName: user.displayName,
            photoURL: user.photoURL || null,
          };

          storeAuthUser(dbUser);
          api.saveUser(dbUser);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Button
                disableElevation
                fullWidth
                onClick={onClickGoogleAuth}
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
                    style={{ marginRight: isSmallScreen ? 8 : 16 }}
                  />
                </Box>
                {!isFetching && <div>Sign in with Google</div>}
                {isFetching && <LoadingSpinner />}
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
                        message: "The email's format is not valid",
                      },
                    })}
                    label="Email"
                    variant="outlined"
                    autoComplete="email"
                    InputProps={{
                      style: { fontSize: 16 },
                    }}
                  />
                  <FormHelperText style={{ minHeight: "25px" }}>
                    {errors.email?.message}
                  </FormHelperText>
                </FormControl>

                <FormControl fullWidth error={Boolean(errors.userName)}>
                  <TextField
                    {...register("userName", {
                      required: "The username is required",
                    })}
                    label="User name"
                    variant="outlined"
                    autoComplete="username"
                    InputProps={{
                      style: { fontSize: 16 },
                    }}
                  />
                  <FormHelperText style={{ minHeight: "25px" }}>
                    {errors.userName?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl fullWidth error={Boolean(errors.homeCountry3Code)}>
                  <InputLabel>Home Country</InputLabel>
                  <Controller
                    name="homeCountry3Code"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Home country is required" }}
                    render={({ field }) => (
                      <Select {...field} label="Home Country">
                        {allCountries &&
                          allCountries.map((country) => (
                            <MenuItem
                              key={country.country_3_code}
                              value={country.country_3_code}
                            >
                              {country.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  <FormHelperText style={{ minHeight: "25px" }}>
                    {errors.homeCountry3Code?.message}
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
                    label="password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                      ),
                    }}
                  />
                  <FormHelperText style={{ minHeight: "25px" }}>
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
                          "The passwords must match",
                      },
                    })}
                    label="Password confirmation"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                      ),
                    }}
                  />
                  <FormHelperText style={{ minHeight: "10px" }}>
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
                    {!isFetching && <div>Create account</div>}
                    {isFetching && <LoadingSpinner color="white" />}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {signedUpMessage !== null && (
        <StandarModal
          color="success"
          title={"User creation success. "}
          message={signedUpMessage}
        />
      )}
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

export default SignUpForm;
