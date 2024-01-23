"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";

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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <SendGAPageView
        pageTitle="City Bureaucracy Page"
        selectedCity={{
          city_name: selectedCity.name,
          city_id: selectedCity.city_id,
        }}
      />
      <Typography variant="h1" sx={{ my: 3, fontSize: 30 }}>
        Bureaucracy
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        xs={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: 0,
        }}
      >
        <Tab label="Essentials" key="Essentials" />
        <Tab label="Visa" key="Visa" />
        <Tab label="Tax Declaration" key="Tax Declaration" />
        <Tab label="Driver's and Vehicle Licensing" key="car-related" />
      </Tabs>
      {selectedTab === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Accordion sx={{ width: "90%", textAlign: "center", my: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Which documents/services do I need? (Also applicable to EU
              citizens)
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ visibility: "hidden" }}>
                        Hidden Cell
                      </TableCell>
                      <TableCell align="center" colSpan={4}>
                        Essentials
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell />
                      <TableCell align="center">NIE/TIE</TableCell>
                      <TableCell align="center">Empadronamiento</TableCell>
                      <TableCell align="center">
                        Social Security number
                      </TableCell>
                      <TableCell align="center">Health Card</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key="moreThan3Months"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Signing any contract (ex: lease)
                      </TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">❌</TableCell>
                    </TableRow>
                    <TableRow
                      key="gettingAJob"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Work in Spain
                      </TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">❌</TableCell>
                    </TableRow>
                    <TableRow
                      key="gettingAJob"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Using the public health system
                      </TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">✅</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              m: 1,
              width: "90%",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
                Essentials
              </Typography>
              <Chip
                label={
                  <div>
                    Discount code: <b>10SITYEX</b>
                  </div>
                }
                sx={{ backgroundColor: "#b39ddb", color: "white" }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 12, my: 1 }}
              >
                **Remember to apply the code when you are in the payment page**
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
                sx={{ fontSize: 16, m: 2 }}
              >
                We have partnered with <b>Entre Tramites</b> to offer you a{" "}
                <b>10% discount</b> on all their essential services. They will
                take<b> care of the whole process for you, 100% online.</b>
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
          </Card>
          <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
            Available services
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Non-residential NIE
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who plan to:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Buy or sell property.</li>
                        <li>Inherit assets.</li>
                        <li>Conduct significant financial transactions.</li>
                        <li>
                          Engage in any legal activity that requires a Spanish
                          tax identification number.
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €190
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €171
                      </span>
                    </span>
                  </Typography>
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
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Residential NIE
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who plan to:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
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
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €190
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €171
                      </span>
                    </span>
                  </Typography>
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
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Empadronamiento
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who plan to:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>
                          Access any kind of public service and benefits in
                          Spain.
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €64,1
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €57,69
                      </span>
                    </span>
                  </Typography>
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
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Non-EU citizen Half Pack
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      Perfect if you don't need all the paperwork, includes:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €152,5
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €137,25
                      </span>
                    </span>
                  </Typography>
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
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Non-EU citizen Full Pack
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who want all their paperwork ready in one go,
                      includes:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                        <li>Digital Certificate.</li>
                        <li>Social Security Number.</li>
                        <li>Individual Health Card (TSI).</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €215,4
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €193,86
                      </span>
                    </span>
                  </Typography>
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
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      EU citizen Half Pack
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      Perfect if you don't need all the paperwork, includes:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €252,9
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €227,61
                      </span>
                    </span>
                  </Typography>
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
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      EU citizen Full Pack
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who want all their paperwork ready in one go,
                      includes:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                        <li>Digital Certificate.</li>
                        <li>Social Security Number.</li>
                        <li>Individual Health Card (TSI).</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €315,8
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €284,22
                      </span>
                    </span>
                  </Typography>
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              m: 1,
              width: "90%",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
                How to get a Visa
              </Typography>
              <Chip
                label={
                  <div>
                    Discount code: <b>10SITYEX</b>
                  </div>
                }
                sx={{ backgroundColor: "#b39ddb", color: "white" }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 12, my: 1 }}
              >
                **Remember to apply the code when you are in the payment page**
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
                sx={{ fontSize: 16, m: 2 }}
              >
                We have partnered with <b>Entre Tramites</b> to offer you a{" "}
                <b>10% discount</b> on all their Visa services. They will take
                <b> care of the whole process for you, 100% online.</b>
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
          </Card>
          <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
            Available Visas
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box
                    sx={{
                      minHeight: { md: 190 },
                    }}
                  >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Digital Nomad Visa
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who plan to:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>
                          Work remotely for companies based outside Spain.
                        </li>
                        <li>
                          Live and work in Spain while maintaining their
                          employment.
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €632,8
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €569,52
                      </span>
                    </span>
                  </Typography>
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
                    href="https://entretramites.com/en/digital-nomad-visa-consultation"
                    target="_blank"
                  >
                    Go to partner's page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box
                    sx={{
                      minHeight: { md: 190 },
                    }}
                  >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Golden Visa (Non-EU citizens)
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who plan to:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Stay long-term in Spain.</li>
                        <li>Make a significant investment in Spain.</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €1.201,5
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €1081,35
                      </span>
                    </span>
                  </Typography>
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
                    href="https://entretramites.com/servicios/tramites-extranjeria/golden-visa-espana"
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
      {selectedTab === 2 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 305 } }}>
                    <Box sx={{ minHeight: { md: 75 } }}>
                      <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
                        Beckham Law
                      </Typography>
                      <Typography> **English speaking**</Typography>
                    </Box>
                    <img
                      width="200"
                      height="50"
                      src={`${imagesCdn}/partner_logos/entretramites.webp`}
                      alt="entretramites icon"
                      title="EntreTramites"
                    />
                    <Box sx={{ textAlign: "left", mt: 2 }}>
                      <Typography variant="body2">
                        For those who want to:
                      </Typography>

                      <ul>
                        <li>
                          Pay tax only on Spanish-sourced income at a flat,
                          lower rate.
                        </li>
                        <li>
                          Have a simplified tax filing process compared to
                          regular resident taxation.
                        </li>
                      </ul>
                    </Box>
                  </Box>

                  <Chip
                    label={
                      <div>
                        Discount code: <b>10SITYEX</b>
                      </div>
                    }
                    sx={{ backgroundColor: "#b39ddb", color: "white" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 1 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €317,0
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €285,3
                      </span>
                    </span>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    sx={{ alignSelf: "center", mt: 1 }}
                    size="small"
                    variant="contained"
                    href="https://entretramites.com/en/services/beckham-law-free-consultation"
                    target="_blank"
                  >
                    Go to Partner's page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 305 } }}>
                    <Box sx={{ minHeight: { md: 75 } }}>
                      <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
                        Accountant Tax Declaration
                      </Typography>
                      <Typography> **English speaking**</Typography>
                    </Box>
                    <img
                      width="200"
                      height="50"
                      src={`${imagesCdn}/partner_logos/entretramites.webp`}
                      alt="entretramites icon"
                      title="EntreTramites"
                    />
                    <Box sx={{ textAlign: "left", mt: 2 }}>
                      <Typography variant="body2">
                        For those who want to:
                      </Typography>

                      <ul>
                        <li>
                          Do the Tax Declaration with an experienced accountant.
                        </li>
                        <li>
                          Do the Tax Declaration with an english speaking
                          accountant.
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Chip
                    label={
                      <div>
                        Discount code: <b>10SITYEX</b>
                      </div>
                    }
                    sx={{ backgroundColor: "#b39ddb", color: "white" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 1 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €70,2
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €63,18
                      </span>
                    </span>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    sx={{ alignSelf: "center", mt: 1 }}
                    size="small"
                    variant="contained"
                    href="https://entretramites.com/en/services/income-tax-return"
                    target="_blank"
                  >
                    Go to Partner's page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 380 } }}>
                    <Box sx={{ minHeight: { md: 75 } }}>
                      <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
                        Automated Tax Declaration
                      </Typography>
                      <Typography> **in Spanish**</Typography>
                    </Box>
                    <img
                      width="200"
                      height="40"
                      src={`${imagesCdn}/partner_logos/taxdown.png`}
                      alt="taxdown icon"
                      title="Taxdown"
                    />
                    <Box sx={{ textAlign: "left", mt: 3 }}>
                      <Typography variant="body2" gutterBottom>
                        For those who want to:
                      </Typography>
                      <Box sx={{ textAlign: "left" }}>
                        <ul>
                          <li>
                            Do the Tax Declaration in an automated fashion.
                          </li>
                          <li>Do the Tax Declaration completely online.</li>
                        </ul>
                      </Box>
                    </Box>
                    <Typography variant="body1" gutterBottom sx={{ my: 1 }}>
                      We have partnered with <b>TaxDown</b> to offer you a{" "}
                      <b>15% discount</b> on their Tax Declaration automated
                      service.
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    sx={{ alignSelf: "center", mt: 1 }}
                    size="small"
                    variant="contained"
                    href="https://taxdown.es/landings_partners/sityex/?utm_source=empleados&utm_medium=partnership&utm_campaign=empleados_partnership"
                    target="_blank"
                  >
                    Redeem discount
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      {selectedTab === 3 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              m: 1,
              width: "90%",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
                Driver's And Vehicle Licensing
              </Typography>
              <Chip
                label={
                  <div>
                    Discount code: <b>10SITYEX</b>
                  </div>
                }
                sx={{ backgroundColor: "#b39ddb", color: "white" }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 12, my: 1 }}
              >
                **Remember to apply the code when you are in the payment page**
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
                sx={{ fontSize: 16, m: 2 }}
              >
                We have partnered with <b>Entre Tramites</b> to offer you a{" "}
                <b>10% discount</b> on all their Driver's and Vehicle Licensing.
                They will take
                <b> care of the whole process for you, 100% online.</b>
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
          </Card>
          <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
            Available services
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Driver's License Exchange
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>
                          Have a driver's license from a country different from
                          Spain.
                        </li>
                        <li>
                          Want to have that driver's license recognized in
                          Spain.
                        </li>
                        <li>Want a complete management of the procedure.</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €315,8
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €284,22
                      </span>
                    </span>
                  </Typography>
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
                    href="https://entretramites.com/en/services/dgt-services-in-spain"
                    target="_blank"
                  >
                    Go to partner's page
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  m: 1,
                  textAlign: "center",
                }}
              >
                <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                  <Box sx={{ minHeight: { md: 238 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Vehicle Registration
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      For those who:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Want to register a vehicle in Spain.</li>
                        <li>Want a complete management of the procedure.</li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", my: 2 }}
                  >
                    <span
                      style={{
                        border: "1px solid #673ab7",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        €544,50
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €490,05
                      </span>
                    </span>
                  </Typography>
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
                    href="https://entretramites.com/en/services/dgt-services-in-spain"
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
    </Box>
  );
};

export default BureaucracyPage;
