

import React from 'react'

import { Route } from 'react-router-dom'

import SignUpPage from 'components/Pages/SignUpPage'
import LogInPage from 'components/Pages/LogInPage'
import HomePage from 'components/Pages/HomePage'
import DestinationPage from 'components/Pages/DestinationPage'
import NewExperiencePage from 'components/Pages/NewExperiencePage'

import * as ROUTES from 'constants/routes'

const Routes = () =>
  <div>
    <Route exact path={ROUTES.LANDING} render={(props) => <LogInPage {...props}  />} />
    <Route path={ROUTES.SIGN_UP} render={(props) => <SignUpPage {...props}  />} />
    <Route path={ROUTES.LOG_IN} render={(props) => <LogInPage {...props}  />} />
    <Route path={ROUTES.HOME} render={(props) => <HomePage {...props}  />} />
    <Route path={ROUTES.DESTINATION} render={(props) => <DestinationPage {...props}  />} />
    <Route path={ROUTES.NEW_EXPERIENCE} render={(props) => <NewExperiencePage {...props}  />} />
  </div>

export default Routes
