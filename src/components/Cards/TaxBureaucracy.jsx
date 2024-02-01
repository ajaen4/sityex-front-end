"use client";

import React, { useState } from "react";

import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from "@mui/material";

import RequirementsModal from "components/Modals/RequirementsModal";

import { imagesCdn } from "constants/constants";

const TaxBureaucracy = ({
  title,
  is_taxdown,
  content,
  mdMinHeight,
  mdMinHeightContent,
  price,
  requirements,
  paymentLink,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [requirementsContent, setRequirementsContent] = useState("");

  const formatNumberEuropeanStyle = (number) => {
    return number.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const onClickRequirements = () => {
    setRequirementsContent(requirements);
    setShowModal(true);
  };

  return (
    <Box>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          m: 1,
          textAlign: "center",
        }}
      >
        <CardContent sx={{ pb: 0, minHeight: { md: mdMinHeightContent } }}>
          <Box sx={{ minHeight: { md: mdMinHeight } }}>
            <Box sx={{ minHeight: { md: 45 } }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {title}
              </Typography>
              {is_taxdown && <Typography> **Spanish speaking**</Typography>}
              {!is_taxdown && <Typography> **English speaking**</Typography>}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: { md: 70 },
              }}
            >
              <img
                width="200"
                src={
                  is_taxdown
                    ? `${imagesCdn}/partner_logos/taxdown.png`
                    : `${imagesCdn}/partner_logos/entretramites.webp`
                }
                alt="partner icon"
                title="Partner"
                style={{ marginTop: is_taxdown ? 25 : 15 }}
              />
            </Box>
            {content}
          </Box>
          {!is_taxdown && (
            <Chip
              label={
                <div>
                  Discount code: <b>10SITYEX</b>
                </div>
              }
              sx={{ backgroundColor: "#673ab7", color: "white" }}
            />
          )}
          {price && (
            <Typography variant="body2" sx={{ textAlign: "center", my: 2 }}>
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
                  €{formatNumberEuropeanStyle(price)}
                </span>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  €{formatNumberEuropeanStyle(price * 0.9)}
                </span>
              </span>
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {requirements && (
            <Button
              sx={{ alignSelf: "center", my: 1, color: "white" }}
              size="small"
              variant="contained"
              target="_blank"
              color="orange"
              onClick={onClickRequirements}
            >
              See requirements
            </Button>
          )}
          <Button
            sx={{ alignSelf: "center", mt: 1 }}
            size="small"
            variant="contained"
            href={paymentLink}
            target="_blank"
          >
            Hire service
          </Button>
        </CardActions>
      </Card>

      <RequirementsModal
        title="Requirements"
        message={requirementsContent}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default TaxBureaucracy;
