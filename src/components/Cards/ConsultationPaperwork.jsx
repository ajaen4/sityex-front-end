"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

import RequirementsModal from "components/Modals/RequirementsModal";
import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";

const ConsultationPaperwork = ({
  title,
  content,
  mdMinHeight,
  price,
  requirements,
  freeConsultationLink,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [requirementsContent, setRequirementsContent] = useState("");

  const auth = useSelector((state) => state.auth);

  const { setShowSignUpModal } = useShowSignUpContext();

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

  const onClickHire = () => {
    if (auth.isAuthResolved === false) {
      setShowSignUpModal(true);
    }
    else{
      window.open(freeConsultationLink, '_blank', 'noopener,noreferrer');
    }
  }

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
        <CardContent sx={{ pb: 0 }}>
          <Box sx={{ minHeight: { md: mdMinHeight } }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {title}
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
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            <b>
              A free consultation with a specialist is necessary for this
              service.
            </b>
          </Typography>
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
            onClick={onClickHire}
          >
            Free consultation
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

export default ConsultationPaperwork;
