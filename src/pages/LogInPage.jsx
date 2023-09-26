import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Container, Box, Card } from "@mui/material";

import { withoutAuth } from "session";

import LogInForm from "components/Forms/LogInForm.jsx";

const LogInPage = () => {
  const theme = useTheme();

  useEffect(() => {
    document.title = "Log In Page";
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.primary.light }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
            <Grid item sx={{ mb: 3 }}>
              <Link to="#"></Link>
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
                    Hi, Welcome Back
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
            <LogInForm />
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default withoutAuth(LogInPage);
