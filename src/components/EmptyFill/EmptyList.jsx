
import React from "react"

import {
  Container,
  Card,
  CardBody
} from "reactstrap"

const EmptyList = ({ message }) => {

  return(
    <Container style = {{justifyContent: "center", textAlign: "center"}}>
      <Card>
        <CardBody>
          <p>{message}</p>
        </CardBody>
      </Card>
    </Container>
  )

}

export default EmptyList
