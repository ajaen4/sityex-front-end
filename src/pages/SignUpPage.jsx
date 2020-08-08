import React from 'react';

import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose'

// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

//Custom functionality
import { withoutAuth } from 'session'

import SignUpForm from "components/Forms/SignUpForm.jsx";

const  SignUpPageBase = () => {

    debugger
    return (
      <>
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
    )
}

const SignUpPage = compose(
  withRouter,
  withoutAuth)(SignUpPageBase);

export default SignUpPage;
