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
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import Google from "assets/img/icons/social-google.svg";
import Facebook from "assets/img/icons/facebook.png";

import StandarModal from "components/Modals/StandarModal";
import { createUser, logInUserWithGoogle, logInUserWithFacebook } from "actions";
import { sameAs } from "helpers/validators";

import * as ROUTES_PATHS from "routes/paths";

const SignUpForm = ({ setIsFetching }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [errorMessage, setErrorMessage] = useState(null);
  const [signedUpMessage, setSignedUpMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const signUpUser = (data) => {
    setIsFetching(true);
    dispatch(createUser(data)).then(
      (user) => {
        setIsFetching(false);
        setSignedUpMessage(
          "Verify your email to be able to log in. Remember to check your spam folder!"
        );
      },
      (error) => {
        setErrorMessage(error);
        setIsFetching(false);
      }
    );
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
  };

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
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: isSmallScreen ? 8 : 16 }}
                />
              </Box>
              Sign Up with Google
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
              Sign up with Email address
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(signUpUser)}
              noValidate
              sx={{
                mt: 1,
                width: "80%"
              }}
            >
              <FormControl fullWidth error={Boolean(errors.email)}>
                <TextField
                  {...register("email", {
                    required: "The email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "The email's format is not valid"
                    }
                  })}
                  label="Email"
                  variant="outlined"
                  autoComplete="email"
                  InputProps={{
                    style: { fontSize: 16 }
                  }}
                />
                <FormHelperText style={{ minHeight: "25px" }}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.userName)}>
                <TextField
                  {...register("userName", {
                    required: "The username is required"
                  })}
                  label="User name"
                  variant="outlined"
                  autoComplete="username"
                  InputProps={{
                    style: { fontSize: 16 }
                  }}
                />
                <FormHelperText style={{ minHeight: "25px" }}>
                  {errors.userName?.message}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.homeCountry)}>
                <TextField
                  {...register("homeCountry", {
                    required: "The home country is required"
                  })}
                  label="Home country"
                  variant="outlined"
                  autoComplete="country"
                  InputProps={{
                    style: { fontSize: 16 }
                  }}
                />
                <FormHelperText style={{ minHeight: "25px" }}>
                  {errors.homeCountry?.message}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.password)}>
                <TextField
                  {...register("password", {
                    required: "The password is required",
                    minLength: {
                      value: 8,
                      message: "The password must have at least 8 characters"
                    }
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
                    )
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
                      message: "The password must have at least 8 characters"
                    },
                    validate: {
                      sameAs: (value) =>
                        sameAs(getValues, "password")(value) ||
                        "The passwords must match"
                    }
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
                    )
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
