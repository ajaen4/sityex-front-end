import React from "react";

import { withoutAuth } from "session";

import LogInForm from "components/Forms/LogInForm.jsx";

const LogInPageBase = () => {
  return <LogInForm />
};

export default withoutAuth(LogInPageBase);
