import React from 'react'

import { connect } from 'react-redux'

// reactstrap components
import{
  Container,
  Row,
  Col,
  Card
} from "reactstrap"

//Custom functionality
import { withAuth } from 'session'

//Custom UI components
import DefaultFooter from "components/Footers/DefaultFooter"
import ScrollNotifications from "components/ScrollList/ScrollNotifications"
import ScrollUserDestinations from "components/ScrollList/ScrollUserDestinations"

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
        <Card
          style = {{marginTop: "30px", fontSize: "15px"}}>
          <Container style = {{padding: "10px"}}>
            <Row style = {{justifyContent: "center"}}>
              <Col lg = "4" xs = "6" className = "rowDirection" style = {{marginTop: "10px"}}>
                <i className="now-ui-icons users_single-02" style = {{
                  marginTop: "3px",
                  marginRight: "7px",
                }}></i>
                <div><b>Nombre:</b> {userData.data.userName}</div>
              </Col>
              <Col lg = "4" xs = "6" className = "rowDirection" style = {{marginTop: "10px"}}>
                <img alt = "age icon" src = {require("assets/icons/age.png")} style = {{
                  marginRight: "6px",
                  marginLeft: "5px",
                  height: "20px"
                }}></img>
                <div><b>Edad:</b> {userData.data.userName}</div>
              </Col>
              <Col lg = "4" xs = "12" className = "rowDirection" style = {{marginTop: "10px"}}>
                <i className="now-ui-icons education_hat" style = {{
                  marginTop: "3px",
                  marginRight: "7px",
                }}></i>
                <div><b>Universidad:</b> {userData.data.userName}</div>
              </Col>
              <Col lg = "4" xs = "12" className = "rowDirection" style = {{marginTop: "10px", marginBottom:"10px"}}>
                <i className="now-ui-icons location_pin" style = {{
                  marginTop: "3px",
                  marginRight: "7px",
                }}></i>
                <div><b>Ciudad:</b> {userData.data.userName}</div>
              </Col>
            </Row>
          </Container>
        </Card>
        <Row style = {{justifyContent: "center"}}>
          <Col sm = "12" md = "12" lg = "12" >
            <h3>Notificaciones</h3>
            <ScrollNotifications notifications = {[]} isFetching = {false}/>
          </Col>
        </Row>
        <Row style = {{justifyContent: "center"}}>
          <Col sm = "12" md = "12" lg = "12" >
            <h3>Mis destinos</h3>
            <ScrollUserDestinations destinations = {[]} isFetching = {false}/>
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
