import React, {Component} from 'react';

import { withRouter } from 'react-router-dom';

// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

import NavbarErasmus from "components/Navbars/NavbarErasmus.js";
import SignUpForm from "components/Forms/SignUpForm.jsx";

class SignUpPageBase extends Component {

  constructor (props){

    super(props);
    this.state = {
      authUser: props.authUser
    };
  }

  render(){

    return (
      <>
      <NavbarErasmus color = "blue"/>
      <Container className="content" style = {{
        marginTop: "100px",
        justifyContent: "center",
        textAlign: "center"}}>
        <Card style={{
          width: "40%",
          minWidth: "300px"
          }} >
          <CardBody>
          <CardTitle style={{
            color: "grey"
          }}>Crear nuevo usuario</CardTitle>
          <SignUpForm/>
          </CardBody>
        </Card>
      </Container>
    </>
    );
  }
}


const SignUpPage = withRouter(SignUpPageBase);

export {SignUpForm};
export default SignUpPage;
