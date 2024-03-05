"use client";

import React from "react";
import { useSelector } from "react-redux";

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

import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";

const EssentialsPaperwork = ({
  title,
  content,
  mdMinHeight,
  tooltipText,
  price,
  governmentFees,
  paymentLink,
}) => {
  const auth = useSelector((state) => state.auth);

  const { setShowSignUpModal } = useShowSignUpContext();

  const formatNumberEuropeanStyle = (number) => {
    return number.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const onClick = () => {
    if (auth.isAuthResolved === false) {
      setShowSignUpModal(true);
      localStorage.setItem("destinationURL", paymentLink);
      localStorage.setItem("openInNewTab", true);
    } else {
      window.open(paymentLink, "_blank", "noopener,noreferrer");
    }
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
                sx={{ mx: 0.5, p: 0 }}
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
          Service price:{" "}
          <span
            style={{
              border: "1px solid #673ab7",
              borderRadius: "10px",
              padding: "1px 5px",
              display: "inline-block",
            }}
          >
            <span
              style={{
                textDecoration: "line-through",
                marginRight: "5px",
              }}
            >
              €{formatNumberEuropeanStyle(price)}
            </span>
            <span style={{ color: "green", fontWeight: "bold" }}>
              €{formatNumberEuropeanStyle(price * 0.9)}
            </span>
          </span>
        </Typography>
        {governmentFees >= 0 && (
          <Typography variant="body2" sx={{ textAlign: "center", my: 2 }}>
            Government fees:{" "}
            <span
              style={{
                border: "1px solid #673ab7",
                borderRadius: "10px",
                padding: "1px 5px",
                display: "inline-block",
              }}
            >
              <span>€{formatNumberEuropeanStyle(governmentFees)}</span>
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
        <Button
          sx={{ alignSelf: "center" }}
          size="small"
          variant="contained"
          onClick={onClick}
        >
          Hire service
        </Button>
      </CardActions>
    </Card>
  );
};

export default EssentialsPaperwork;
