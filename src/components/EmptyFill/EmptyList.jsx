
import React from "react"

import {
  Container,
  Card,
  CardBody
} from "reactstrap"

const EmptyList = ({ name }) => {

  return(
    <Container style = {{justifyContent: "center", textAlign: "center"}}>
      <Card>
        <CardBody>
          <p>{"Aun no hay " + name + ", se el primero en rellenar una!"}</p>
        </CardBody>
      </Card>
    </Container>
  )

}

export default EmptyList
