import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {
  LogInPage,
  SignUpPage,
  HomePage,
  DestinationPage,
  ReviewPage,
} from 'pages'

import * as ROUTES_PATHS from 'constants/routes'

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES_PATHS.LANDING} element={<LogInPage />} />
    <Route path={ROUTES_PATHS.SIGN_UP} element={<SignUpPage />} />
    <Route path={ROUTES_PATHS.LOG_IN} element={<LogInPage />} />
    <Route path={ROUTES_PATHS.HOME} element={<HomePage />} />
    <Route path={ROUTES_PATHS.DESTINATION} element={<DestinationPage />} />
    <Route path={ROUTES_PATHS.NEW_REVIEW} element={<ReviewPage />} />
  </Routes>
);

export default AppRoutes
