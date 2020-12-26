
import React from "react"

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"


const Experience = ({data}) => {

  const LG = "3"
  const SM = "5"

  return (
    <Card style = {{margin: "5px"}}>
      <CardBody>
        <Row>
          <Col lg = "2" md = "12" sm = "12" style = {{
            justifyContent: "center"
          }}>
          <div className="card-avatar">
            <img
              alt="..."
              className="img img-raised"
              src={require("assets/img/ryan.jpg")}
            ></img>
            </div>
          </Col>
          <Col lg = "9"
            style = {{
              width: "100%"
          }}>
          <Row style = {{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "10px",
            flexDirection: "row"
          }}>
            <Col lg = "6" md = "6" sm = "6"
              style = {{
                paddingLeft: "0px",
                paddingRight: "0px",
                textAlign: "left"
              }}>
                <div> <b>Media: </b> {(Number(data.Clima) + Number(data.Comida) + Number(data.Fiesta) + Number(data["Viajes ESN"])) / 4}
                </div>
            </Col>
            <Col lg = "6" md = "6" sm = "6"
              style = {{
                paddingLeft: "0px",
                paddingRight: "0px",
                textAlign: "right"
              }}>
              <Row style = {{
                justifyContent: "flex-end"
              }}>
                <i className = "now-ui-icons ui-1_calendar-60" style = {{
                  marginTop: "6px",
                  marginRight: "5px"
                }}></i>
                <div style = {{
                  marginTop:"3px"
                }}><b>Fecha: </b> {data.timeStamp.toDate().toDateString()}
                </div>
              </Row>
            </Col>
          </Row>
            <Row style = {{
              justifyContent: "space-evenly",
              textAlign: "center",
              marginTop: "10px"
            }}>
              <Col lg = {LG} md = {LG} sm = {SM}>
                <Row style = {{
                  flexDirection: "row"
                }}>
                  <img alt = "climate icon" src = {require("assets/icons/sun.png")} style = {{
                    marginTop:"3px",
                    marginRight: "7px",
                    marginLeft: "5px",
                    height: "20px"
                  }}></img>
                  <div style = {{
                    marginTop:"3px"
                  }}> <b>Clima: </b> {data.Clima}
                  </div>
                </Row>
              </Col>
              <Col lg = {LG} md = {LG} sm = {SM}>
                <Row style = {{
                  flexDirection: "row"
                }}>
                  <i className = "now-ui-icons shopping_basket" style = {{
                    marginTop: "5px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                    marginTop:"3px"
                  }}> <b>Comida: </b> {data.Comida}
                  </div>
                </Row>
              </Col>
              <Col lg = {LG} md = {LG} sm = {SM}>
                <Row style = {{
                  flexDirection: "row"
                }}>
                  <i className = "now-ui-icons emoticons_satisfied" style = {{
                    marginTop: "5px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                    marginTop:"3px"
                  }}> <b>Fiesta: </b> {data.Fiesta}
                  </div>
                </Row>
              </Col>
              <Col lg = {LG} md = {LG} sm = {SM}>
                <Row style = {{
                  flexDirection: "row"
                }}>
                  <img alt = "climate icon" src = {require("assets/icons/sun.png")} style = {{
                    marginTop:"3px",
                    marginRight: "7px",
                    marginLeft: "5px",
                    height: "20px"
                  }}></img>
                  <div style = {{
                    marginTop:"3px"
                  }}> <b>Viajes ESN: </b> {data["Viajes ESN"]}
                  </div>
                </Row>
              </Col>
            </Row>
            <Row style = {{
              marginTop: "15px"
            }}>
              <div className = "blockquote" style = {{
                borderColor: "#B3D4FF",
                borderRadius: "5px",
                width: "100%",
                padding: "10px"
              }}>
                <p className = "bold"
                style = {{
                  fontSize: "0.9rem"
                }}>Consejo</p>
                <p style = {{
                  fontSize: "0.8rem"
                }}>{data.advice}</p>
              </div>
            </Row>
          </Col>
        </Row>
      </CardBody>
      </Card>
    )
  }

export default Experience
