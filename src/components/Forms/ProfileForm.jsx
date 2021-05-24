
import React from "react"
import { useForm } from 'react-hook-form'

//reactstrap components
import {
  Row,
  Col,
  Container,
  Form
} from "reactstrap"

//Custom components
import InputIconLeft from "components/Inputs/InputIconLeft"
import DateSelector from "components/Inputs/DateSelector"


const ProfileForm = ({userData}) => {

  const {register, handleSubmit, errors} = useForm()

    return (
      <>
        <Form>
          <Container>
          <Row style = {{
            justifyContent: "center",
            marginTop: "40px"
          }}>
            <Col lg = "4" md = "4">
              <InputIconLeft
                register = {register}
                handleSubmit = {handleSubmit}
                errors = {errors}
                orgValue = {userData.userName}
                fieldName = "name"
                label = "Nombre:"/>
            </Col>
            <Col lg = "4" md = "4">
              <InputIconLeft
                register = {register}
                handleSubmit = {handleSubmit}
                errors = {errors}
                orgValue = {userData.userName}
                fieldName = "surname"
                label = "Apellido:"/>
            </Col>
            <Col lg = "4" md = "4">
              <InputIconLeft
                register = {register}
                handleSubmit = {handleSubmit}
                errors = {errors}
                orgValue = {userData.email}
                fieldName = "email"
                label = "Email:"/>
            </Col>
            <Col lg = "4" md = "4" style = {{marginTop: "6px"}}>
              <DateSelector
                label = "Fecha de nacimiento:"/>
            </Col>
            <Col lg = "4" md = "4">
              <InputIconLeft
                register = {register}
                handleSubmit = {handleSubmit}
                errors = {errors}
                orgValue = {userData.userName}
                fieldName = {"city"}
                label = "Ciudad:"/>
            </Col>
            <Col lg = "4" md = "4">
              <InputIconLeft
                register = {register}
                handleSubmit = {handleSubmit}
                errors = {errors}
                orgValue = {userData.userName}
                fieldName = {"country"}
                label = "Pais:"/>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  )
}

export default ProfileForm
