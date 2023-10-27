import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import initStore from "store";
import { Provider } from "react-redux";

import Routes from "routes/";
import ScrollTop from "components/ScrollControl/ScrollTop";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";

import {
  onAuthStateChanged,
  storeAuthUser,
  fetchCitiesIndex,
  checkUserConnection
} from "actions";

import { saveState } from "localStorage/localStorage";

const store = initStore();

//Persist user info, no refresh
store.subscribe(() => {
  const stateToSave = {};
  stateToSave.auth = store.getState().auth;
  saveState(stateToSave);
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: null,
      componentMounted: false
    };
  }

  componentDidMount() {
    this.setState({ componentMounted: true });
    this.unsuscribeAuth = onAuthStateChanged((authUser) => {
      store.dispatch(storeAuthUser(authUser));

      if (authUser) {
        checkUserConnection(authUser.uid);
        this.setState({ auth: authUser });
      }
    });
  }

  componentWillUnmount() {
    this.unsuscribeAuth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (store.getState().citiesIndex.data === null) {
      store.dispatch(fetchCitiesIndex());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollTop>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme()}>
                <CssBaseline />
                <Routes />
              </ThemeProvider>
            </StyledEngineProvider>
          </ScrollTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
