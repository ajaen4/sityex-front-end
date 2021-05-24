
import React from "react"

// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  Row,
  Col,
  Button
} from "reactstrap"

const NotificationsDropDown = ({messages, windowDimensions}) => {
  
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        style = {{margin: "0px", backgroundColor: "transparent"}}
      >
        {((messages === undefined) || (messages.length === 0)) && <img alt = "notifications icon" src = {require("assets/icons/notification.png")} style = {{
          height: "20px"
        }}></img>}
        {(messages) && (messages.length !== 0) && <img alt = "notifications icon" src = {require("assets/icons/new_notification.png")} style = {{
          height: "20px"
        }}></img>}
      </DropdownToggle>
      {(messages.length !== 0) &&
        <DropdownMenu style = {{backgroundColor: "white", minWidth: windowDimensions > 400 ? "350px" : "290px", minHeight: windowDimensions > 400 ? "150px" : "200px"}}>
          {messages.sort().map(item =>
            <Row
              name = {item.id}
              id = {item.id}
              key = {item.id}
              style = {{
                margin: "5px",
                borderBottom: "1px solid",
                borderColor: "#b2b4b8",
                fontSize: windowDimensions > 400 ? "1.5vh" : "1.8vh",
              whiteSpace: "normal"}}>
              <Col lg = "2" xs = "2" style = {{padding: "5px"}}>
                <img
                  alt="..."
                  className="rounded-circle"
                  src={require("assets/img/ryan.jpg")}
                ></img>
              </Col>
              <Col lg = "6" xs = "6" style = {{padding: windowDimensions > 400 ? "5px" : "3px"}}>
                <p>{item.message}</p>
              </Col>
              <Col lg = "2" xs = "2" style = {{padding: windowDimensions > 400 ? "5px" : "2px", justifyContent: "center"}}>
                <Button
                  size = "sm"
                  color = "success"
                  style = {{borderRadius: "100px"}}>
                  <img
                    alt="..."
                    className="rounded-circle"
                    height= "20px"
                    src={require("assets/icons/check.png")}
                  ></img>
                </Button>
              </Col>
              <Col lg = "2" xs = "2" style = {{padding: windowDimensions > 400 ? "5px" : "2px", justifyContent: "center"}}>
                <Button
                  size = "sm"
                  color = "danger"
                  style = {{borderRadius: "100px"}}>
                  <img
                    alt="..."
                    className="rounded-circle"
                    height= "20px"
                    src={require("assets/icons/check.png")}
                  ></img>
                </Button>
              </Col>
          </Row>)}
      </DropdownMenu>
    }
    </UncontrolledDropdown>
  )
}

export default NotificationsDropDown
