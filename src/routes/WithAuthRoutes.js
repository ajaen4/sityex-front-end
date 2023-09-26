import MainLayout from "Layouts/MainLayout";

import { HomePage, DestinationPage, ReviewPage } from "pages";

import * as ROUTES_PATHS from "routes/paths";

const WithAuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: ROUTES_PATHS.HOME,
      element: <HomePage />,
    },
    {
      path: ROUTES_PATHS.DESTINATION,
      children: [
        {
          path: ":location",
          element: <DestinationPage />,
        },
      ],
    },
    {
      path: ROUTES_PATHS.NEW_REVIEW,
      element: <ReviewPage />,
    },
  ],
};

export default WithAuthRoutes;
