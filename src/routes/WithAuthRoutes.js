import MainLayout from "Layouts/MainLayout";

import {
  SearchPage,
  MapPage,
  ReviewPage,
  CityPage,
  CityInfoPage,
  CityPlacesPage,
  CityReviewsPage
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
      path: ROUTES_PATHS.NEW_REVIEW,
      element: <ReviewPage />
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
          path: ROUTES_PATHS.CITY_PLACES,
          element: <CityPlacesPage />
        },
        {
          path: ROUTES_PATHS.CITY_REVIEWS,
          element: <CityReviewsPage />
        }
      ]
    }
  ]
};

export default WithAuthRoutes;
