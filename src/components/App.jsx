import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SignUpPage from './Pages/SignUpPage';
import LogInPage from './Pages/LogInPage';
import HomePage from './Pages/HomePage';
import DestinationPage from './Pages/DestinationPage';
import NewExperiencePage from './Pages/NewExperiencePage';

import * as ROUTES from '../constants/routes';
import { withFirebase } from './Firebase';

class App extends Component {

  constructor (props){
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }
  componentWillUnmount() {
    this.listener();
  }

  render(){
    return (
      <Router>
        <div>
          <Route exact path={ROUTES.LANDING} render={(props) => <LogInPage {...props} authUser={this.state.authUser} />} />
          <Route path={ROUTES.SIGN_UP} render={(props) => <SignUpPage {...props} authUser={this.state.authUser} />} />
          <Route path={ROUTES.LOG_IN} render={(props) => <LogInPage {...props} authUser={this.state.authUser} />} />
          <Route path={ROUTES.HOME} render={(props) => <HomePage {...props} authUser={this.state.authUser} />} />
          <Route path={ROUTES.DESTINATION} render={(props) => <DestinationPage {...props} authUser={this.state.authUser} />} />
          <Route path={ROUTES.NEW_EXPERIENCE} render={(props) => <NewExperiencePage {...props} authUser={this.state.authUser} />} />
        </div>
      </Router>

    );
  }
}

export default withFirebase(App);
