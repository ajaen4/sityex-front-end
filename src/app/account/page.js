"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

import {
  useMediaQuery,
  Box,
  Avatar,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackOutlined";

import WithAuth from "components/Session/WithAuth";

import { updateUser } from "actions";

import * as api from "api";

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  const auth = useSelector((state) => state.auth.data);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    api.getCountries().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  useEffect(() => {
    if (auth) {
      setValue("userName", auth.userName);
      setValue("homeCountry3Code", auth.homeCountry3Code || "");
      setValue("email", auth.email);
    }
  }, [auth, allCountries, setValue]);

  const updateUserData = (data) => {
    const dataWithId = { ...data, id: auth.id };
    updateUser(dataWithId)
      .then((_) => {
        setSnackbarMessage("Profile updated");
      })
      .catch((_) => {
        setSnackbarMessage("Error updating profile");
      });
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Grid container spacing={1}>
        {((isSmallScreen && selectedTab === false) || !isSmallScreen) && (
          <Grid item xs={12} md={4}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar
                  alt="Remy Sharp"
                  src={`https://eu.ui-avatars.com/api/?name=${auth.userName.replace(
                    " ",
                    "+",
                  )}&size=512`}
                  sx={{ width: 50, height: 50 }}
                />
              </Grid>
              <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h2">{auth.userName}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sx={{ mt: 3, borderRight: 1, borderColor: "divider" }}
              >
                <Tabs
                  orientation="vertical"
                  value={selectedTab}
                  onChange={handleChange}
                  aria-label="account tabs"
                >
                  <Tab label="Public Profile" />
                  <Tab label="Account" />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <Box sx={{ mt: { md: 1.5 } }}>
            {selectedTab === 0 && (
              <div>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {isSmallScreen && (
                    <IconButton onClick={() => handleChange(null, false)}>
                      <ArrowBackIcon sx={{ mr: 2 }} />
                    </IconButton>
                  )}
                  <Typography variant="h2">Public Profile</Typography>
                </Box>
                <Divider sx={{ mt: 1 }} />
                <Box
                  component="form"
                  onSubmit={handleSubmit(updateUserData)}
                  noValidate
                  sx={{
                    mt: 3,
                    width: "80%",
                  }}
                >
                  <FormControl fullWidth error={Boolean(errors.userName)}>
                    <TextField
                      {...register("userName", {
                        required: "The username is required",
                      })}
                      label="User name"
                      variant="outlined"
                      InputProps={{
                        style: { fontSize: 16 },
                      }}
                    />
                    <FormHelperText style={{ minHeight: "30px" }}>
                      {errors.userName?.message}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(errors.homeCountry3Code)}
                  >
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
                    <FormHelperText style={{ minHeight: "30px" }}>
                      {errors.homeCountry3Code?.message}
                    </FormHelperText>
                  </FormControl>
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      style={{ margin: "2%", width: "100%" }}
                    >
                      Update profile
                    </Button>
                  </Box>
                </Box>
              </div>
            )}
            {selectedTab === 1 && (
              <div>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {isSmallScreen && (
                    <IconButton onClick={() => handleChange(null, false)}>
                      <ArrowBackIcon sx={{ mr: 2 }} />
                    </IconButton>
                  )}
                  <Typography variant="h2">Account</Typography>
                </Box>
                <Divider sx={{ mt: 1 }} />
                <Box
                  component="form"
                  onSubmit={handleSubmit(updateUserData)}
                  noValidate
                  sx={{
                    mt: 3,
                    width: "80%",
                  }}
                >
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <TextField
                      {...register("email", {
                        required: "The username is required",
                      })}
                      label="Email"
                      variant="outlined"
                      InputProps={{
                        style: { fontSize: 16 },
                      }}
                      disabled
                    />
                    <FormHelperText style={{ minHeight: "30px" }}>
                      {errors.email?.message}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarMessage !== null}
        autoHideDuration={6000}
        onClose={snackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={snackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WithAuth(AccountPage);
