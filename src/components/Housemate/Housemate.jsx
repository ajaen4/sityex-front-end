
import React, {useEffect} from "react"

// reactstrap components
import {
  Button,
  Card,
  Media,
  Container,
  Row,
  Col
} from "reactstrap";

//import HousemateVisualMap from "components/GoogleMaps/HousemateVisualMap"

const Housemate = ({data}) => {

  const [windowDimensions, setWindowDimensions] = React.useState(window.innerWidth)
  //const [isOpen, setIsOpen] = React.useState(false)

  /*const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }*/

  //Updates the window dimensions (width) when this changes
  const updateWindowDimensions = () => setWindowDimensions(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions)
    return function cleanup() {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  })

  return (
    <Card style = {{margin: "5px"}}>
      <Container>
        <Row>
          {(windowDimensions > 800) && <Col lg = "1" md = "2" style = {{padding: "10px"}}>
            <img
              alt="..."
              className="rounded-circle img-raised"
              src={require("assets/img/ryan.jpg")}
            ></img>
          </Col>}
          <Col lg = "11" md = "9">
            <Row>
              <Col lg = "6" md = "6" sm = "6" xs = "6" style = {{paddingLeft: "10px"}}>
                <Media heading tag="h5" style = {{marginTop: "8px", paddingLeft: "10px"}}>
                  {data.userName + " "}
                  <small className="text-muted">· {data.timeStamp.toDate().toLocaleDateString()}</small>
                </Media>
              </Col>
              {(windowDimensions < 720) && <Col xs = "6">
                <Row style = {{justifyContent: "flex-end", marginRight: "5px"}}>
                  <i className = "now-ui-icons ui-1_calendar-60" style = {{
                    marginTop: "13px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                    marginTop: "10px"
                  }}> {data.startDate.toDate().toLocaleDateString() + " - " + data.endDate.toDate().toLocaleDateString()}
                  </div>
                </Row>
              </Col>}
            </Row>
            <Row style = {{
              justifyContent: "space-evenly",
              flexWrap: "wrap"
              }}>
              <Col lg = "4" md = "4" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <img alt = "people icon" src = {require("assets/icons/people.png")}
                    style = {{
                      height: "18px",
                      marginTop: "12px",
                      marginRight: "5px"
                    }}></img>
                  <div style = {{
                    marginTop:"10px"
                  }}> {(windowDimensions > 990) && <b>Personas compartiendo: </b>}
                      {(windowDimensions < 990) && <b>Personas: </b>} {data.peopleSharing}
                  </div>
                </Row>
              </Col>
              <Col lg = "4" md = "4" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons business_money-coins" style = {{
                    marginTop: "14px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                    marginTop:"10px"
                  }}> {(windowDimensions > 990) && <b>Precio de alquiler: </b>}
                      {(windowDimensions < 990) && <b>Precio: </b>} {data.rent}
                  </div>
                </Row>
              </Col>
              {(windowDimensions > 720) && <Col lg = "4" md = "4" sm = "12" xs = "12">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons ui-1_calendar-60" style = {{
                    marginTop: "13px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                    marginTop:"10px"
                  }}> {(windowDimensions > 990) &&  <b>Estancia: </b>} {data.startDate.toDate().toLocaleDateString() + " - " + data.endDate.toDate().toLocaleDateString()}
                  </div>
                </Row>
              </Col>}
              <Col lg = "4" md = "4" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <img alt = "cleanlines" src = {require("assets/icons/broom.png")} style = {{
                    marginTop:"10px",
                    marginRight: "3px",
                    marginLeft: "5px",
                    height: "20px"
                  }}></img>
                  <div style = {{
                    marginTop:"10px"
                  }}> <b>Limpieza: </b> {data.cleanliness}
                  </div>
                </Row>
              </Col>
              <Col lg = "4" md = "4" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons emoticons_satisfied" style = {{
                    marginTop: "14px",
                    marginRight: "5px"
                  }}></i>
                  <div style = {{
                    marginTop:"10px"
                  }}> <b>Fiesta: </b> {data.party}
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
                    }}>Comentario</p>
                    <p style = {{
                      fontSize: "0.8rem"
                    }}>{data.comment}</p>
                  </div>
                </Row>
                {/*<Row style = {{
                  justifyContent: "center"
                }}>
                  <i className = {"now-ui-icons" + (isOpen ? " arrows-1_minimal-up" : " arrows-1_minimal-down")} onClick={toggleIsOpen} style={{
                    margin: '10px'
                  }}></i>
                  <Collapse isOpen={isOpen} style = {{
                    marginLeft: "0px !important",
                    width: "100%",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                    paddingBottom: "15px"
                  }}>
                    <HousemateVisualMap
                      center = {data.circleLocation}
                      circleRadiusProp = {data.circleRadius}/>
                  </Collapse>
                </Row>*/}
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

export default Housemate
