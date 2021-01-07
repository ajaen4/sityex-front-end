import React from 'react'

import { connect } from 'react-redux'

// reactstrap components
import{
  Container,
  Row,
  Col
} from "reactstrap"

//Custom functionality
import { withAuth } from 'session'

//Custom UI components
import DefaultFooter from "components/Footers/DefaultFooter"
import ProfileForm from "components/Forms/ProfileForm"

const ProfilePage = ({userData}) => {

  return (
    <>
      <Container style = {{justifyContent: "center", textAlign: "center"}}>
        <h2 className = "bold" style = {{marginTop: "100px"}}> {userData.data.userName} </h2>
        <Row style = {{justifyContent: "center"}}>
          <Col lg = "2">
            <img
              alt="..."
              className="rounded-circle"
              src={require("assets/img/ryan.jpg")}
              style = {{maxHeight: "150px"}}
            ></img>
          </Col>
        </Row>
        <ProfileForm userData = {userData.data}/>
        <Row style = {{justifyContent: "center", marginTop: "20px"}}>
          <Col sm = "12" md = "12" lg = "12" >
            <h3>Notificaciones</h3>
          </Col>
        </Row>
        <Row style = {{justifyContent: "center", marginTop: "20px"}}>
          <Col sm = "12" md = "12" lg = "12" >
            <h3>Mis destinos</h3>
          </Col>
        </Row>
      </Container>
      <DefaultFooter />
    </>
  )
}

const mapStateToProps = state => ({
  userData: state.auth
})

export default connect(mapStateToProps)(withAuth(ProfilePage))
