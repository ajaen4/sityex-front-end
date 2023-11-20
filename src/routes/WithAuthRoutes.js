import MainLayout from "Layouts/MainLayout";

import {
  SearchPage,
  MapPage,
  CityPage,
  CityInfoPage,
  CityEventsPage,
  CityEventPage
} from "pages";

import * as ROUTES_PATHS from "routes/paths";

const WithAuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <SearchPage />
    },
    {
      path: ROUTES_PATHS.SEARCH,
      element: <SearchPage />
    },
    {
      path: ROUTES_PATHS.MAP,
      element: <MapPage />
    },
    {
      path: ROUTES_PATHS.DESTINATION,
      element: <CityPage />,
      children: [
        {
          path: ROUTES_PATHS.CITY_INFO,
          element: <CityInfoPage />
        },
        {
          path: ROUTES_PATHS.CITY_EVENTS,
          element: <CityEventsPage />
        },
        {
          path: ROUTES_PATHS.CITY_EVENT,
          element: <CityEventPage />
        }
      ]
    }
  ]
};

export default WithAuthRoutes;
