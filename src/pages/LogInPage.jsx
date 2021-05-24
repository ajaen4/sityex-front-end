import React from 'react'

// reactstrap components
import{
  Container,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap"

//Custom functionality
import { withoutAuth } from 'session'

//Custom UI components
import LogInForm from "components/Forms/LogInForm.jsx"

const LogInPageBase = () => {

  return (
    <>
      <Container style = {{
        marginTop: "100px"
      }}>
        <Row style = {{
          textAlign: "center",
          justifyContent: "center"
        }}>
          <Col lg = "5" md = "8" sm = "12" xs = "12">
            <Card>
              <CardBody>
                <CardTitle style={{
                  color: "grey"
                }}>Bienvenido!</CardTitle>
                <LogInForm/>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </Container>
  </>
  )
}

export default withoutAuth(LogInPageBase)
