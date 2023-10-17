import MinimalLayout from "Layouts/MinLayout";

import { LogInPage, SignUpPage } from "pages";

import * as ROUTES_PATHS from "routes/paths";

const WithoutAuthRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: ROUTES_PATHS.LOG_IN,
      element: <LogInPage />
    },
    {
      path: ROUTES_PATHS.SIGN_UP,
      element: <SignUpPage />
    }
  ]
};

export default WithoutAuthRoutes;
