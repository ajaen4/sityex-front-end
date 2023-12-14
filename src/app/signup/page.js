"use client";

import React from "react";

import { Stack, Typography, Box } from "@mui/material";

import SignUpForm from "components/Forms/SignUpForm";
import WithoutAuth from "components/Session/WithoutAuth";

const SignUpPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "primary.light",
        height: {
          xs: "86.5vh",
          md: "83vh",
          lg: "91vh",
          xl: "93vh",
        },
        overflow: "scroll",
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
          mt: 10,
          mb: 3,
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
            Sign Up
          </Typography>
          <Typography variant="caption" fontSize="16px" textAlign="center">
            Enter your credentials to continue
          </Typography>
          <SignUpForm />
        </Stack>
      </Box>
    </Box>
  );
};

export default WithoutAuth(SignUpPage);
