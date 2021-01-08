

import React from 'react'

import { Route } from 'react-router-dom'

import {
  LogInPage,
  SignUpPage,
  HomePage,
  DestinationPage,
  ExperiencePage,
  ProfilePage,
  HousematePage,
  ChatPage} from 'pages'

import * as ROUTES from 'constants/routes'

const Routes = () =>
  <div>
    <Route exact path={ROUTES.LANDING} render={(props) => <LogInPage {...props}  />} />
    <Route path={ROUTES.SIGN_UP} render={(props) => <SignUpPage {...props}  />} />
    <Route path={ROUTES.LOG_IN} render={(props) => <LogInPage {...props}  />} />
    <Route path={ROUTES.HOME} render={(props) => <HomePage {...props}  />} />
    <Route path={ROUTES.DESTINATION} render={(props) => <DestinationPage {...props}  />} />
    <Route path={ROUTES.NEW_EXPERIENCE} render={(props) => <ExperiencePage {...props}  />} />
    <Route path={ROUTES.NEW_HOUSEMATE} render={(props) => <HousematePage {...props}  />} />
    <Route exact path={ROUTES.PROFILE} render={(props) => <ProfilePage {...props}  />} />
    <Route exact path={ROUTES.CHAT} render={(props) => <ChatPage {...props}  />} />
  </div>

export default Routes
