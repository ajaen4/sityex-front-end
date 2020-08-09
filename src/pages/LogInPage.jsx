import React from 'react'

import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle
} from "reactstrap"

//Custom functionality
import { withoutAuth } from 'session'

//Custom UI components
import LogInForm from "components/Forms/LogInForm.jsx"

const LogInPageBase = () => {

  return (
    <>
    <Container style = {{
      marginTop: "100px",
      textAlign: "center",
      justifyContent: "center"
    }}>
      <Card style={{
        width: "40%",
        minWidth: "300px"
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


const LogInPage = compose(
  withoutAuth,
  withRouter)(LogInPageBase)

export default LogInPage
