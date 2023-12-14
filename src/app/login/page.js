"use client";

import React from "react";

import { Stack, Typography, Box } from "@mui/material";

import LogInForm from "components/Forms/LogInForm";
import WithoutAuth from "components/Session/WithoutAuth";

const LogInPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: {
          xs: "86.5vh",
          md: "83vh",
          lg: "92vh",
          xl: "93vh",
        },
        backgroundColor: "primary.light",
        py: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: { md: 475 },
          border: "1px solid",
          borderColor: "primary.light",
          borderRadius: 3,
          p: 2,
          mx: 3,
          backgroundColor: "white",
          boxShadow:
            "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
        }}
      >
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Typography
            color={"secondary.main"}
            gutterBottom
            variant="h1"
            style={{ fontSize: 25 }}
          >
            Hi, Welcome Back
          </Typography>
          <Typography variant="caption" fontSize="16px" textAlign="center">
            Enter your credentials to continue
          </Typography>
          <LogInForm />
        </Stack>
      </Box>
    </Box>
  );
};

export default WithoutAuth(LogInPage);
