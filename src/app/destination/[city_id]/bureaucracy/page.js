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
  Tooltip,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import SendGAPageView from "components/DataLoaders/SendGAPageView";
import RequirementsModal from "components/Modals/RequirementsModal";

import { imagesCdn } from "constants/constants";

const BureaucracyPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [requirementsContent, setRequirementsContent] = useState("");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const onClickDigitalNomad = () => {
    setRequirementsContent(
      <ul style={{ fontSize: 15 }}>
        <li style={{ marginBottom: "5px" }}>
          Demonstrate at least{" "}
          <b>
            3 years of work experience in the field or hold a Professional
            Degree
          </b>{" "}
          related to the job position.
        </li>
        <li style={{ marginBottom: "5px" }}>
          You must have been working for your company for at least 3 months and
          have a <b>contract of at least 1 year.</b> Also, you need to have a
          written authorization to work remotely.
        </li>
        <li style={{ marginBottom: "5px" }}>
          Your company should be <b>located outside Spain.</b>
        </li>
        <li style={{ marginBottom: "5px" }}>
          Prove that your income from Spanish clients{" "}
          <b>does not represent more than 20% of your total earnings.</b>
        </li>
        <li style={{ marginBottom: "5px" }}>
          Have a <b>minimum income level</b> of at least €30.240 (and even more
          if you take your relatives with you).
        </li>
        <li>
          Have a{" "}
          <b>
            clean criminal record and private health insurance with full
            coverage
          </b>{" "}
          in Spain.
        </li>
      </ul>
    );
    setShowModal(true);
  };

  const onClickGoldenVisa = () => {
    setRequirementsContent(
      <ul style={{ fontSize: 15 }}>
        <li style={{ marginBottom: "5px" }}>
          Not being a citizen of the European Union.
        </li>
        <li style={{ marginBottom: "5px" }}>
          Be of legal age <b>(+18 in Spain).</b>
        </li>
        <li style={{ marginBottom: "5px" }}>
          Have no criminal record, either in Spain or in any other country, for
          the last 5 years.
        </li>
        <li style={{ marginBottom: "5px" }}>
          Have health care coverage in Spain. This can be through public
          insurance or private insurance but{" "}
          <b>it must belong to an insurance company in Spain.</b>
        </li>
        <li style={{ marginBottom: "5px" }}>
          To have and prove the possession of sufficient financial resources to
          support both the main investor and their family if the application is
          made for them as well.
        </li>
        <li>
          Making the relevant investment{" "}
          <b>(whether 500,000, €1M or €2M depending on which path is chosen)</b>
          , and provide the corresponding document to prove it.
        </li>
      </ul>
    );
    setShowModal(true);
  };

  const onClickBeckhamLaw = () => {
    setRequirementsContent(
      <div style={{ fontSize: 15 }}>
        You can apply for the Beckham Law if you are a foreign worker{" "}
        <b>who just moved to Spain</b> and one of the following:
        <ul>
          <li style={{ marginTop: "5px", marginBottom: "5px" }}>
            An expat with an executive or management position and high income.
          </li>
          <li style={{ marginBottom: "5px" }}>
            A highly qualified professional who provides services to emerging
            companies (this case has some extra conditions).
          </li>
          <li style={{ marginBottom: "5px" }}>
            A remote worker in Spain that works for a foreign company.
          </li>
          <li style={{ marginBottom: "5px" }}>
            An administrator who will work for a Spanish company (they should
            have a participation of less than 25% in the case of asset-holding
            companies).
          </li>
          <li>
            An entrepreneur with an innovative project of special economic
            interest for Spain.
          </li>
        </ul>
      </div>
    );
    setShowModal(true);
  };

  return (
    <Box
      sx={{
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
          <Accordion
            sx={{
              textAlign: "center",
              my: 1,
              width: "95%",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Which documents/services do I need? (Also applicable to EU
              citizens)
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="center">
                        Non-residential NIE
                        <Tooltip
                          enterTouchDelay={0}
                          title="
                      Tax identification number assigned to every foreigner who
                      carries out an economic or professional activity."
                        >
                          <IconButton>
                            <HelpOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        Residential NIE{" "}
                        <Tooltip
                          enterTouchDelay={0}
                          title="
                          Certifies the right of a person to reside in Spain. Also
                          brings the tax identification number."
                        >
                          <IconButton>
                            <HelpOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        Empadronamiento{" "}
                        <Tooltip
                          enterTouchDelay={0}
                          title="
                          Allows individuals to declare their place of residence in
                      Spain. It is required for accessing public services and
                      benefits."
                        >
                          <IconButton>
                            <HelpOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        Social Security number
                        <Tooltip
                          enterTouchDelay={0}
                          title="
                          It identifies the citizen with Social Security, which provides residents with medical assistance and social benefits in cases of unemployment, old age, sick leave, etc."
                        >
                          <IconButton>
                            <HelpOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        Health Card
                        <Tooltip
                          enterTouchDelay={0}
                          title="
                          It is the document that identifies and allows foreigners to have access to medical centers and services of your assigned public health system."
                        >
                          <IconButton>
                            <HelpOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key="spanishTaxNotLivingSpain"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Engage in any activity that requires a Spanish tax
                        number without living in Spain
                      </TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">❌</TableCell>
                    </TableRow>
                    <TableRow
                      key="moreThan3Months"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Staying in Spain for more than 3 months
                      </TableCell>
                      <TableCell align="center">❌</TableCell>
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
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">❌</TableCell>
                      <TableCell align="center">✅</TableCell>
                      <TableCell align="center">❌</TableCell>
                    </TableRow>
                    <TableRow
                      key="usingPublicHealthcare"
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Using the public health system
                      </TableCell>
                      <TableCell align="center">❌</TableCell>
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
              textAlign: "center",
              my: 1,
              padding: 2,
              width: "95%",
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
                sx={{ backgroundColor: "#673ab7", color: "white" }}
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
                style={{ marginTop: 15 }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 16, m: 2 }}
              >
                We have partnered with <b>Entre Trámites</b> to offer you a{" "}
                <b>10% discount</b> on all their essential services. They will
                take<b> care of the whole process for you, 100% online.</b>
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 16, m: 2 }}
              >
                Still not sure what you need?
              </Typography>
              <Button
                sx={{ alignSelf: "center" }}
                size="small"
                variant="contained"
                href="https://entretramites.com/en/partners-program/free-consultation-partners?aff=3d90441f"
                target="_blank"
              >
                Get free consultation
              </Button>
              <Box sx={{ mt: 3 }}>
                <Stepper alternativeLabel>
                  <Step key="first-step">
                    <StepLabel>First step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Choose the documents you need
                    </Typography>
                  </Step>
                  <Step key="second-step">
                    <StepLabel>Second step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Redeem your discount through our code
                    </Typography>
                  </Step>
                  <Step key="thid-step">
                    <StepLabel>Third step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Wait from an email from Entre Trámites
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
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 260 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Non-residential NIE
                      <Tooltip
                        enterTouchDelay={0}
                        title="
                      Tax identification number assigned to every foreigner who
                      carries out an economic or professional activity."
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
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
                        €189,97
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €170,97
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5175&t=1b1e3c17"
                    target="_blank"
                  >
                    Hire service
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
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 260 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Residential NIE
                      <Tooltip
                        enterTouchDelay={0}
                        title="
                        Certifies the right of a person to reside in Spain. Also
                        brings the tax identification number."
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
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
                        €189,97
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €170,97
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5176&t=48fcd379"
                    target="_blank"
                  >
                    Hire service
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
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 260 } }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      Empadronamiento
                      <Tooltip
                        enterTouchDelay={0}
                        title="
                          Allows individuals to declare their place of residence in
                      Spain. It is required for accessing public services and
                      benefits."
                      >
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
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
                        €64,13
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €57,72
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5186&t=81b370ad"
                    target="_blank"
                  >
                    Hire service
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
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 252 } }}>
                    <Typography variant="h4" sx={{ my: 1, minHeight: 40 }}>
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
                        €152,46
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €137,21
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5179&t=7da3d896"
                    target="_blank"
                  >
                    Hire service
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
                <CardContent sx={{ pb: 0 }}>
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
                        €215,38
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €193,84
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5180&t=b9898094"
                    target="_blank"
                  >
                    Hire service
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
                <CardContent sx={{ pb: 0 }}>
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
                        €252,89
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €227,60
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5177&t=92a353b4"
                    target="_blank"
                  >
                    Hire service
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
                <CardContent sx={{ pb: 0 }}>
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
                        €315,81
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €284,23
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5178&t=944e39a6"
                    target="_blank"
                  >
                    Hire service
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
              textAlign: "center",
              my: 1,
              padding: 2,
              width: "95%",
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
                sx={{ backgroundColor: "#673ab7", color: "white" }}
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
                style={{ marginTop: 15 }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 16, m: 2 }}
              >
                We have partnered with <b>Entre Trámites</b> to offer you a{" "}
                <b>10% discount</b> on all their Visa services. They will take
                <b> care of the whole process for you, 100% online.</b>
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Stepper alternativeLabel>
                  <Step key="first-step">
                    <StepLabel>First step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Choose the documents you need
                    </Typography>
                  </Step>
                  <Step key="second-step">
                    <StepLabel>Second step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Redeem your discount through our code
                    </Typography>
                  </Step>
                  <Step key="thid-step">
                    <StepLabel>Third step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Wait for an email from Entre Trámites
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
                <CardContent sx={{ pb: 0 }}>
                  <Box
                    sx={{
                      minHeight: { md: 205 },
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
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    <b>
                      A free consultation with a specialist is necessary for
                      this service.
                    </b>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    sx={{ alignSelf: "center", my: 1, color: "white" }}
                    size="small"
                    variant="contained"
                    target="_blank"
                    color="orange"
                    onClick={onClickDigitalNomad}
                  >
                    See requirements
                  </Button>
                  <Button
                    sx={{ alignSelf: "center", mt: 1 }}
                    size="small"
                    variant="contained"
                    href="https://entretramites.com/en/digital-nomad-visa-consultation"
                    target="_blank"
                  >
                    Get free consultation
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
                <CardContent sx={{ pb: 0 }}>
                  <Box
                    sx={{
                      minHeight: { md: 205 },
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
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    <b>
                      A free consultation with a specialist is necessary for
                      this service.
                    </b>
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    sx={{
                      alignSelf: "center",
                      my: 1,
                      color: "white",
                    }}
                    size="small"
                    variant="contained"
                    target="_blank"
                    color="orange"
                    onClick={onClickGoldenVisa}
                  >
                    See requirements
                  </Button>
                  <Button
                    sx={{ alignSelf: "center", mt: 1 }}
                    size="small"
                    variant="contained"
                    href="https://entretramites.com/en/free-immigration-consultation"
                    target="_blank"
                  >
                    Get free consultation
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
                  minHeight: { md: 550 },
                }}
              >
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 325 } }}>
                    <Box sx={{ minHeight: { md: 75 } }}>
                      <Typography variant="h3" gutterBottom sx={{ mb: 1 }}>
                        Beckham Law (Application)
                      </Typography>
                      <Typography> **English speaking**</Typography>
                    </Box>
                    <img
                      width="200"
                      height="50"
                      src={`${imagesCdn}/partner_logos/entretramites.webp`}
                      alt="entretramites icon"
                      title="EntreTramites"
                      style={{ marginTop: 15 }}
                    />
                    <Box sx={{ textAlign: "left", mt: 2 }}>
                      <Typography variant="body2">
                        For those who want to:
                      </Typography>

                      <ul>
                        <li>
                          Pay tax only on Spanish-sourced income at a flat,
                          lower rate (24%).
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
                    sx={{ backgroundColor: "#673ab7", color: "white" }}
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
                        €317,02
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €285,32
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
                    sx={{ alignSelf: "center", my: 1, color: "white" }}
                    size="small"
                    variant="contained"
                    target="_blank"
                    color="orange"
                    onClick={onClickBeckhamLaw}
                  >
                    See requirements
                  </Button>
                  <Button
                    sx={{ alignSelf: "center", mt: 1 }}
                    size="small"
                    variant="contained"
                    href="https://app.entretramites.com/stripePaymentLink?id=5184&t=4f330a11"
                    target="_blank"
                  >
                    Hire service
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
                  minHeight: { md: 555 },
                }}
              >
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 325 } }}>
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
                      style={{ marginTop: 15 }}
                    />
                    <Box sx={{ textAlign: "left", mt: 2 }}>
                      <Typography variant="body2">
                        For those who want to:
                      </Typography>

                      <ul>
                        <li>Are new to Spanish taxes.</li>
                        <li>Want simple, fast and up-to-date guidance.</li>
                        <li>have a professional do your taxes for you.</li>
                      </ul>
                    </Box>
                  </Box>
                  <Chip
                    label={
                      <div>
                        Discount code: <b>10SITYEX</b>
                      </div>
                    }
                    sx={{ backgroundColor: "#673ab7", color: "white" }}
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
                        €70,18
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        €63,16
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
                    href="https://app.entretramites.com/stripePaymentLink?id=5183&t=c23194a7"
                    target="_blank"
                  >
                    Hire service
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
                  minHeight: { md: 555 },
                }}
              >
                <CardContent sx={{ pb: 0 }}>
                  <Box sx={{ minHeight: { md: 398 } }}>
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
                      style={{ marginTop: 15 }}
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
              textAlign: "center",
              my: 1,
              padding: 2,
              width: "95%",
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
                sx={{ backgroundColor: "#673ab7", color: "white" }}
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
                style={{ marginTop: 15 }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontSize: 16, m: 2 }}
              >
                We have partnered with <b>Entre Trámites</b> to offer you a{" "}
                <b>10% discount</b> on all their Driver's and Vehicle Licensing.
                They will take
                <b> care of the whole process for you, 100% online.</b>
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Stepper alternativeLabel>
                  <Step key="first-step">
                    <StepLabel>First step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Choose the documents you need
                    </Typography>
                  </Step>
                  <Step key="second-step">
                    <StepLabel>Second step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Redeem your discount through our code
                    </Typography>
                  </Step>
                  <Step key="thid-step">
                    <StepLabel>Third step</StepLabel>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      Wait for an email from Entre Trámites
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
                <CardContent sx={{ pb: 0 }}>
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
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    <b>
                      A free consultation with a specialist is necessary for
                      this service.
                    </b>
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
                    href="https://entretramites.com/en/partners-program/free-consultation-partners?aff=3d90441f"
                    target="_blank"
                  >
                    Get free consultation
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
                <CardContent sx={{ pb: 0 }}>
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
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    <b>
                      A free consultation with a specialist is necessary for
                      this service.
                    </b>
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
                    href="https://entretramites.com/en/partners-program/free-consultation-partners?aff=3d90441f"
                    target="_blank"
                  >
                    Get free consultation
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      <RequirementsModal
        title="Requirements"
        message={requirementsContent}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default BureaucracyPage;
