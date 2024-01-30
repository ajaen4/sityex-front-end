"use client";

import React from "react";

import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const EssentialsBureaucracy = ({
  title,
  content,
  mdMinHeight,
  tooltipText,
  price,
  paymentLink,
}) => {
  const formatNumberEuropeanStyle = (number) => {
    return number.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 1,
        textAlign: "center",
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Box sx={{ minHeight: { md: mdMinHeight } }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {title}
            {tooltipText && (
              <Tooltip
                enterTouchDelay={0}
                title={tooltipText}
                sx={{ mx: 1, p: 0 }}
              >
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          {content}
        </Box>
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
          href={paymentLink}
          target="_blank"
        >
          Hire service
        </Button>
      </CardActions>
    </Card>
  );
};

export default EssentialsBureaucracy;
