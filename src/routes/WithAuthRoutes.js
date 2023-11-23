import MainLayout from "Layouts/MainLayout";

import {
  LandingPage,
  SearchPage,
  CityPage,
  CityEventsPage,
  CityEventPage,
  CityCommunityPage
} from "pages";

import * as ROUTES_PATHS from "routes/paths";

const WithAuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: ROUTES_PATHS.SEARCH,
      element: <SearchPage />
    },
    {
      path: ROUTES_PATHS.DESTINATION,
      element: <CityPage />,
      children: [
        {
          path: ROUTES_PATHS.CITY_EVENTS,
          element: <CityEventsPage />
        },
        {
          path: ROUTES_PATHS.CITY_EVENT,
          element: <CityEventPage />
        },
        {
          path: ROUTES_PATHS.CITY_COMMUNITY,
          element: <CityCommunityPage />
        }
      ]
    }
  ]
};

export default WithAuthRoutes;
