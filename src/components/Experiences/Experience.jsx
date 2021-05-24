
import React, {useEffect} from "react"

// reactstrap components
import {
  Button,
  Card,
  Media,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";


const Experience = ({data}) => {

  const [windowDimensions, setWindowDimensions] = React.useState(window.innerWidth)

  //Updates the window dimensions (width) when this changes
  const updateWindowDimensions = () => {
    setWindowDimensions(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions)
    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  })

  return (
    <Card style = {{margin: "5px"}}>
      <Container style = {{paddingTop: "5px", paddingLeft: "15px"}}>
        <Row>
          {(windowDimensions > 800) && <Col lg = "1" md = "2" >
            <img
              alt="..."
              className="rounded-circle img-raised"
              src={require("assets/img/ryan.jpg")}
            ></img>
          </Col>}
          <Col lg = "11" md = "9" style = {{paddingLeft: "10px"}}>
            <Media heading tag = "h5">
              {data.userName + " "}
              <small className="text-muted">· {data.timeStamp.toDate().toLocaleDateString()}</small>
              <Badge color = "info" className = "mr-1" style = {{fontSize: "0.9rem", marginLeft: "10px" }}>
                <div> <b> Media: </b> {(Number(data.weather) + Number(data.food) + Number(data.party) + Number(data.trips)) / 4}
                </div>
              </Badge>
            </Media>
            <Row style = {{
                justifyContent: "space-evenly",
                flexWrap: "wrap"
            }}>
              <Col lg = "3" md = "3" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <img alt = "climate icon" src = {require("assets/icons/sun.png")} style = {{
                      marginTop:"3px",
                      marginRight: "7px",
                      marginLeft: "5px",
                      height: "20px"
                  }}></img>
                  <div style = {{
                      marginTop:"3px"
                  }}> <b>Clima: </b> {data.weather}
                  </div>
                </Row>
              </Col>
              <Col lg = "3" md = "3" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons shopping_basket" style = {{
                      marginTop: "5px",
                      marginRight: "5px"
                  }}></i>
                  <div style = {{
                      marginTop:"3px"
                  }}> <b>Comida: </b> {data.food}
                  </div>
                </Row>
              </Col>
              <Col lg = "3" md = "3" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons emoticons_satisfied" style = {{
                    marginTop: "5px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                      marginTop:"3px"
                  }}> <b>Fiesta: </b> {data.party}
                  </div>
                </Row>
              </Col>
              <Col lg = "3" md = "3" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons transportation_bus-front-12" style = {{
                      marginTop: "5px",
                      marginRight: "5px"
                  }}></i>
                  <div style = {{
                      marginTop:"3px"
                  }}> <b>Viajes ESN: </b> {data.trips}
                  </div>
                </Row>
              </Col>
            </Row>
            <Row style = {{
              marginTop: "15px",
              marginRight: "15px",
              marginLeft: "10px",
              marginBottom: "0px"
            }}>
              <div className = "blockquote" style = {{
                borderColor: "#B3D4FF",
                borderRadius: "5px",
                width: "100%",
                padding: "10px",
                maxHeight: "200px"
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
            <div className="media-footer" style = {{margin: "0px"}}>
              <Button
                style = {{
                  marginTop: "0px",
                  marginBottom: "0px",
                  marginLeft: "0px"
                }}
                className="btn-neutral pull-right"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="now-ui-icons ui-2_favourite-28"></i>{" "}
                25
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
    )
  }

export default Experience
