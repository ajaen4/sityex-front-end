import React, { useState } from "react";

import {
  Stack,
  Typography,
  Box,
  Dialog,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SignUpForm from "components/Forms/SignUpForm";
import LogInForm from "components/Forms/LogInForm";
import { useShowSignUpContext } from "components/Contexts/ShowSignUpContext";

const SignUpModal = ({ open, onClose }) => {
  const [formType, setFormType] = useState("signup");
  const { setShowSignUpModal } = useShowSignUpContext();

  const toggleFormType = () => {
    setFormType(formType === "signup" ? "login" : "signup");
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowSignUpModal(false);
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ mt: 5 }}>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 100,
          color: "black",
          backgroundColor: "white",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ p: 4, maxWidth: { md: 450 } }}
      >
        <Typography
          color={"secondary.main"}
          gutterBottom
          variant="h1"
          style={{ fontSize: 25 }}
        >
          Sign Up
        </Typography>
        <Typography variant="caption" fontSize="16px" textAlign="center">
          Enter your credentials to continue
        </Typography>
        {formType === "signup" && <SignUpForm />}
        {formType === "login" && <LogInForm />}
        <Box sx={{ width: "100%" }}>
          <Divider />
        </Box>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Button sx={{ textDecoration: "none" }} onClick={toggleFormType}>
            {formType === "signup" && "Already have an account?"}
            {formType === "login" && "Don't have an account?"}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default SignUpModal;
