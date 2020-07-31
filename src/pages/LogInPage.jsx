import React from 'react';

import { withRouter } from 'react-router-dom';

// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

//Custom UI components
import LogInForm from "components/Forms/LogInForm.jsx";

const LogInPageBase = () => {

  return (
    <>
    <Container style = {{
      marginTop: "100px",
      textAlign: "center",
      justifyContent: "center"
    }}>
      <Card style={{
        width: "40%"
        }} >
        <CardBody>
          <CardTitle style={{
            color: "grey"
          }}>Bienvenido!</CardTitle>
          <LogInForm/>
        </CardBody>
      </Card>
    </Container>
  </>
  )
}


const LogInPage = withRouter(LogInPageBase);

export default LogInPage;
