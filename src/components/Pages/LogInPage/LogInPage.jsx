import React, {Component} from 'react';

import { withRouter } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { withFirebase } from 'components/Firebase';

// reactstrap components
import{
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

class LogInPageBase extends Component {

  constructor (props){

    super(props);
    this.state = {
      authUser: props.authUser
    };
  }

  render(){

    return (
      <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/background-image.jpg") + ")"
          }}
        ></div>
      <div className="content">
      <Card style={{
        width: "40%",
        minWidth: "300px"
        }} >
        <CardBody>
        <CardTitle style={{
          color: "grey"
        }}>Welcome!</CardTitle>
        <LogInForm/>
        </CardBody>
      </Card>
      </div>
    </div>
    </>
    );
  }
}

const INITIAL_STATE = {
email: '',
password: '',
error: null
};

class LogInFormBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === ''
      ;

    return (
      <form onSubmit={this.onSubmit}>
        <InputGroup
          className = "no-border input-lg input-group-focus"
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons users_circle-08"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name = "email"
            placeholder="Email..."
            type="email"
            value = {email}
            onChange = {this.onChange}
          ></Input>
      </InputGroup>
      <InputGroup
          className = "no-border input-lg input-group-focus"
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_lock-circle-open"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            name = "password"
            placeholder="Password..."
            type="password"
            value = {password}
            onChange = {this.onChange}
          ></Input>
      </InputGroup>
      <Button
        disabled = {isInvalid}
        color = "success"
        style = {{ margin: "2%" }}
        type = "submit"
      >
        Log In
      </Button>
      {/*<Button
        color="white"
        href="signup"
        style={{ margin: "2%" }}
      >
        Create account
      </Button>*/}
      {error &&
      <p style =
      {{ color: "black",
         marginTop: "5%"
      }}
      >{error.message}</p>}
    </form>
    );
  }
}

const LogInForm = withRouter(withFirebase(LogInFormBase));
const LogInPage = withRouter(withFirebase(LogInPageBase));

export {LogInForm};
export default LogInPage;
