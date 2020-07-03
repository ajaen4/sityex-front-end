import React, {Component} from 'react';

import { withRouter } from 'react-router-dom';
import { withFirebase } from 'apis/Firebase';

// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

import NavbarErasmus from "components/Navbars/NavbarErasmus.js";
import SignUpForm from "components/Pages/SignUpPage/SignUpForm.jsx";

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


const SignUpPage = withRouter(withFirebase(SignUpPageBase));

export {SignUpForm};
export default SignUpPage;
