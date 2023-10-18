import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Container, Box, Card } from "@mui/material";

import { withoutAuth } from "session";
import { logAnalyticsEvent } from "api";

import SignUpForm from "components/Forms/SignUpForm.jsx";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import Logo from "assets/img/icons/logo_black.png";

const SignUpPage = () => {
  const theme = useTheme();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    logAnalyticsEvent("page_view", {
      page_title: "Sign Up Page",
      page_location: window.location.href
    });
  }, []);

  if (isFetching) return <CenteredLoadingSpinner />;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          maxWidth: { xs: 400, lg: 475 },
          border: "1px solid",
          borderColor: theme.palette.primary[200] + 25,
          ":hover": {
            boxShadow: "inherit"
          },
          p: { xs: 2, sm: 3, xl: 5 },
          marginTop: 3,
          marginBottom: 3
        }}
      >
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: 160,
                justifyContent: "center",
                alignItems: "center",
                display: "flex"
              }}
            >
              <img src={Logo} alt="SityEx" width={150} height={35} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Container
              sx={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Stack alignItems="center" justifyContent="center" spacing={1}>
                <Typography
                  color={theme.palette.secondary.main}
                  gutterBottom
                  variant="h3"
                >
                  Sign Up
                </Typography>
                <Typography
                  variant="caption"
                  fontSize="16px"
                  textAlign="center"
                >
                  Enter your credentials to continue
                </Typography>
              </Stack>
            </Container>
          </Grid>
          <SignUpForm setIsFetching={setIsFetching} />
        </Grid>
      </Card>
    </Container>
  );
};

export default withoutAuth(SignUpPage);
