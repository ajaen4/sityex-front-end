import React from "react";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import LogInFormBase from "./LogInFormBase";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";

import AuthCardWrapper from "../Cards/AuthCardWrapper";

const LogInForm = ({ dispatch }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{ minHeight: "100vh", backgroundColor: theme.palette.primary.light }}
    >
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 68px)" }}
        >
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthCardWrapper>
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
                  <Grid
                    container
                    direction={matchDownSM ? "column-reverse" : "row"}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                      >
                        <Typography
                          color={theme.palette.secondary.main}
                          gutterBottom
                          variant={matchDownSM ? "h3" : "h2"}
                        >
                          Hi, Welcome Back
                        </Typography>
                        <Typography
                          variant="caption"
                          fontSize="16px"
                          textAlign={matchDownSM ? "center" : "inherit"}
                        >
                          Enter your credentials to continue
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <LogInFormBase dispatch={dispatch} />
              </Grid>
            </AuthCardWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect()(LogInForm);
