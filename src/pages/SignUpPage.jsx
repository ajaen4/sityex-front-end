import React from 'react'


// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"

//Custom functionality
import { withoutAuth } from 'session'

import SignUpForm from "components/Forms/SignUpForm.jsx"

const SignUpPageBase = () => {

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

export default withoutAuth(SignUpPageBase)
