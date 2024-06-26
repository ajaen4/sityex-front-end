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
import { postHogClient, ReactPixel } from "analytics";

const EntreTramitesExp = ({ ServiceName, showFreeConsultation }) => {
  const freeConsultationLink =
    "https://entretramites.com/en/partners-program/free-consultation-partners?aff=3d90441f";

  const onClickFreeConsultation = () => {
    postHogClient.capture("hire_paperwork", { service: "free_consultation" });
    ReactPixel.track("Purchase", {currency: "EUR", value: 0});
    window.open(freeConsultationLink, "_blank", "noopener,noreferrer");
  };

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
      <div>
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
          <div>
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
              onClick={onClickFreeConsultation}
            >
              Free consultation
            </Button>
          </div>
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
      </div>
    </Card>
  );
};

export default EntreTramitesExp;
