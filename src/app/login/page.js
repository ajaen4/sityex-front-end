"use client";

import React, { useState, useEffect } from "react";

import { Stack, Typography, Box } from "@mui/material";

import LogInForm from "components/Forms/LogInForm";
import WithoutAuth from "components/Session/WithoutAuth";

import { contentHeight, minNavbarHeight } from "constants/constants";

// export const metadata = {
//   title: "SityEx | Log In - Continue Your Journey",
//   description:
//     "Welcome back to SityEx. Log in to reconnect with the expatriate community in Spain, discover new events, and access personalized resources.",
// };

const LogInPage = () => {
  const [innerHeight, setInnerHeight] = useState(contentHeight);

  useEffect(() => {
    const innerHeightPx = window.innerHeight;

    const correctedHeight = {
      xs: `calc(${innerHeightPx}px - ${minNavbarHeight.xs})`,
      md: `calc(${innerHeightPx}px - ${minNavbarHeight.md})`,
      lg: `calc(${innerHeightPx}px - ${minNavbarHeight.lg})`,
      xl: `calc(${innerHeightPx}px - ${minNavbarHeight.xl})`,
    };

    setInnerHeight(correctedHeight);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: innerHeight,
        backgroundColor: "primary.light",
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
