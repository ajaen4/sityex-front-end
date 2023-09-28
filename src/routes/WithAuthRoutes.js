import { Search } from "@mui/icons-material";
import MainLayout from "Layouts/MainLayout";

import {
  SearchPage,
  MapPage,
  CommunityPage,
  CostOfLivingPage,
  ReviewPage,
  WeatherPage,
  AccessibilityPage,
  DemographicsPage,
} from "pages";

import * as ROUTES_PATHS from "routes/paths";

const WithAuthRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <SearchPage />,
    },
    {
      path: ROUTES_PATHS.SEARCH,
      element: <SearchPage />,
    },
    {
      path: ROUTES_PATHS.MAP,
      element: <MapPage />,
    },
    ,
    {
      path: ROUTES_PATHS.DESTINATION,
      children: [
        {
          path: ROUTES_PATHS.CITY_COMMUNITY,
          element: <CommunityPage />,
        },
        {
          path: ROUTES_PATHS.CITY_COST_OF_LIVING,
          element: <CostOfLivingPage />,
        },
        {
          path: ROUTES_PATHS.CITY_WEATHER,
          element: <WeatherPage />,
        },
        {
          path: ROUTES_PATHS.CITY_DEMOGRAPHICS,
          element: <DemographicsPage />,
        },
        {
          path: ROUTES_PATHS.CITY_ACCESSIBILITY,
          element: <AccessibilityPage />,
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
