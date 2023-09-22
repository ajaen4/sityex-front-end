import React from "react";
import { Container } from "@mui/material";

import { withoutAuth } from "session";

import SignUpForm from "components/Forms/SignUpForm.jsx";

const SignUpPageBase = () => {
  return (
    <Container style={{ minHeight: "73vh" }}>
      <SignUpForm />
    </Container>
  );
};

export default withoutAuth(SignUpPageBase);
