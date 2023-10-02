import React, { useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Container, Box, Card } from "@mui/material";

import { withoutAuth } from "session";

import SignUpForm from "components/Forms/SignUpForm.jsx";
import Logo from "assets/img/icons/logo_black.png";

const SignUpPage = () => {
  const theme = useTheme();

  useEffect(() => {
    document.title = "Sign Up Page";
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.light }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: { xs: 400, lg: 475 },
            margin: { xs: 2.5, md: 3 },
            border: "1px solid",
            borderColor: theme.palette.primary[200] + 25,
            ":hover": {
              boxShadow: "inherit",
            },
            p: { xs: 2, sm: 3, xl: 5 },
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  width: 160,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <img src={Logo} alt="SityEx" width={150} height={35} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Container
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
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
            <SignUpForm />
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default withoutAuth(SignUpPage);
