"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";

import SendGAPageView from "components/DataLoaders/SendGAPageView";

import { imagesCdn } from "constants/constants";

const BureaucracyPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <SendGAPageView
        pageTitle="City Bureaucracy Page"
        selectedCity={selectedCity}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="standard"
          centered
          xs={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Tab label="NIE/TIE" key="NIE/TIE" />
          <Tab label="Tax Declaration" key="Tax Declaration" />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        {selectedTab === 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                m: 1,
                width: "90%",
                padding: 3,
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
                  How it works
                </Typography>
                <Chip
                  label={
                    <div>
                      Discount code: <b>SITYEX10</b>
                    </div>
                  }
                  color="primary"
                />
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: 12, my: 1 }}
                >
                  **Remember to apply the code when you are in the payment
                  page**
                </Typography>
                <img
                  width="200"
                  height="50"
                  src={`${imagesCdn}/partner_logos/entretramites.webp`}
                  alt="entretramites icon"
                  title="Entre Tramites"
                />
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: 16, my: 2 }}
                >
                  We have partnered with <b>Entre Tramites</b> to offer you a{" "}
                  <b>10% discount</b> on all their services.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Stepper alternativeLabel>
                    <Step key="First step">
                      <StepLabel>First step</StepLabel>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Choose the documents you need
                      </Typography>
                    </Step>
                    <Step key="Second step">
                      <StepLabel>Second step</StepLabel>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Redeem your discount through our code
                      </Typography>
                    </Step>
                  </Stepper>
                </Box>
              </Box>
            </Paper>
            <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
              Available Packages
            </Typography>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item xs={10} md={3}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    textAlign: "center",
                    minHeight: { xs: 315, md: 390 },
                  }}
                >
                  <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Residential NIE
                    </Typography>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <ul>
                      <li>Buy or sell property.</li>
                      <li>Inherit assets.</li>
                      <li>Conduct significant financial transactions.</li>
                      <li>Study or work for a short period.</li>
                      <li>
                        Engage in any legal activity that requires a Spanish tax
                        identification number.
                      </li>
                    </ul>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      sx={{ alignSelf: "center" }}
                      size="small"
                      variant="contained"
                      href="https://entretramites.com/en/services/immigration-advice/residence-nie"
                      target="_blank"
                    >
                      Go to partner's page
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={10} md={3}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    textAlign: "center",
                    minHeight: { xs: 315, md: 390 },
                  }}
                >
                  <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Non-residential NIE
                    </Typography>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <ul>
                      <li>Live in Spain for more than three months.</li>
                      <li>
                        Work or engage in any professional activity in Spain.
                      </li>
                      <li>
                        Register for social services and health care in Spain.
                      </li>
                      <li>Apply for a driver's license in Spain.</li>
                      <li>
                        Buy, sell, or own property in Spain as a resident.
                      </li>
                    </ul>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      sx={{ alignSelf: "center" }}
                      size="small"
                      variant="contained"
                      href="https://entretramites.com/en/services/immigration-advice/residence-nie"
                      target="_blank"
                    >
                      Go to partner's page
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={10} md={3}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    m: 1,
                    textAlign: "center",
                    minHeight: { xs: 315, md: 390 },
                  }}
                >
                  <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      Full pack
                    </Typography>
                    <Typography variant="body2">
                      For those who want all their paperwork ready in one go,
                      includes:
                    </Typography>
                    <ul>
                      <li>Residential NIE.</li>
                      <li>Empadronamiento Certificate.</li>
                      <li>Digital Certificate.</li>
                      <li>Social Security Number.</li>
                      <li>Individual Health Card (TSI).</li>
                    </ul>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      sx={{ alignSelf: "center" }}
                      size="small"
                      variant="contained"
                      href="https://entretramites.com/en/services/immigration-advice/residence-nie"
                      target="_blank"
                    >
                      Go to partner's page
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
        {selectedTab === 1 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                m: 1,
                width: "90%",
                padding: 3,
                textAlign: "center",
              }}
            >
              <Box>
                <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
                  How it works
                </Typography>
                <img
                  width="200"
                  height="40"
                  src={`${imagesCdn}/partner_logos/taxdown.png`}
                  alt="taxdown icon"
                  title="Taxdown"
                />
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontSize: 16, my: 2 }}
                >
                  We have partnered with <b>TaxDown</b> to offer you a{" "}
                  <b>15% discount</b> on all their services.
                </Typography>
                <Button
                  sx={{ alignSelf: "center" }}
                  size="small"
                  variant="contained"
                  href="https://app.taxdown.es/"
                  target="_blank"
                >
                  Redeem discount
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BureaucracyPage;
