import React from 'react';

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

class SignUpPage extends React.Component {
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
        }}>Sign Up</CardTitle>
          <SignUpForm />
        </CardBody>
      </Card>
      </div>
    </div>
    </>
    );
  }
}

const INITIAL_STATE = {
username: '',
email: '',
passwordOne: '',
passwordTwo: '',
error: null,
};

class SignUpFormBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });

        //save user in firestore
        this.props.firebase.doSaveUser(username, email);

        this.props.history.push(ROUTES.LOG_IN);
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
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

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
          name = "username"
          placeholder="Username..."
          type="text"
          value = {username}
          onChange = {this.onChange}
        ></Input>
    </InputGroup>
    <InputGroup
      className = "no-border input-lg input-group-focus"
    >
    <InputGroupAddon addonType="prepend">
      <InputGroupText>
        <i className="now-ui-icons ui-1_email-85"></i>
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
        name = "passwordOne"
        placeholder="Password..."
        type="password"
        value = {passwordOne}
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
        name = "passwordTwo"
        placeholder="Repeat Password..."
        type="password"
        value = {passwordTwo}
        onChange = {this.onChange}
      ></Input>
    </InputGroup>
    <Button
      disabled = {isInvalid}
      color = "success"
      style = {{ margin: "2%" }}
      type = "submit"
    >
      Sign Up
    </Button>
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

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export {SignUpForm};
