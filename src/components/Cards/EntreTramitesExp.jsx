"use client";

import React from "react";

import {
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Card,
  Button,
} from "@mui/material";

import { imagesCdn } from "constants/constants";

const EntreTramitesExp = ({ ServiceName, showFreeConsultation }) => {
  return (
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
          {ServiceName}
        </Typography>
        <Chip
          label={
            <div>
              Discount code: <b>10SITYEX</b>
            </div>
          }
          sx={{ backgroundColor: "#673ab7", color: "white" }}
        />
        <Typography variant="body1" gutterBottom sx={{ fontSize: 12, my: 1 }}>
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
        <Typography variant="body1" gutterBottom sx={{ fontSize: 16, m: 2 }}>
          We have partnered with <b>Entre Trámites</b> to offer you a{" "}
          <b>10% discount</b> on all their {ServiceName} services. They will
          take<b> care of the whole process for you, 100% online.</b>
        </Typography>
        {showFreeConsultation && (
          <Box>
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
              Free consultation
            </Button>
          </Box>
        )}
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
  );
};

export default EntreTramitesExp;