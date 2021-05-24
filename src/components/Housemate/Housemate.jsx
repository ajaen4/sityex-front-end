
import React, {useEffect} from "react"

// reactstrap components
import {
  Card,
  Media,
  Container,
  Row,
  Col
} from "reactstrap"

//import HousemateVisualMap from "components/GoogleMaps/HousemateVisualMap"
import ConnectReqButton from "components/Button/ConnectReqButton"

const Housemate = ({housemateData, auth}) => {

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
  // eslint-disable-next-line
  }, [])

  return (
    <Card style = {{margin: "5px"}}>
      <Container style = {{paddingTop: "5px", paddingLeft: "15px"}}>
        <Row>
          {(windowDimensions > 800) && <Col lg = "1" md = "2">
            <img
              alt="..."
              className="rounded-circle img-raised"
              src={require("assets/img/ryan.jpg")}
            ></img>
          </Col>}
          <Col lg = "11" md = "9">
            <Row>
              <Col lg = "6" md = "6" sm = "6" xs = "6" style = {{paddingLeft: "10px"}}>
                <Media heading tag="h5">
                  {housemateData.userName + " "}
                  <small className="text-muted">· {housemateData.timeStamp.toDate().toLocaleDateString()}</small>
                </Media>
              </Col>
              {(windowDimensions < 720) &&
                <Col xs = "6">
                  <Row style = {{justifyContent: "flex-end", marginRight: "5px", marginTop: "6px", flexDirection: "row", fontSize: "3vmin"}}>
                    <i className = "now-ui-icons ui-1_calendar-60" style = {{
                      marginTop: "3px",
                      marginRight: "5px"
                    }}></i>
                    <div style = {{marginTop: "1px"}}> {housemateData.startDate.toDate().toLocaleDateString() + " - " + housemateData.endDate.toDate().toLocaleDateString()}
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
                      marginTop: "3px",
                      marginRight: "5px"
                    }}></img>
                  <div>
                    {(windowDimensions > 990) && <b>Personas compartiendo: </b>}
                    {(windowDimensions < 990) && <b>Personas: </b>} {housemateData.peopleSharing}
                  </div>
                </Row>
              </Col>
              <Col lg = "4" md = "4" sm = "6" xs = "6">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons business_money-coins" style = {{
                    marginTop: "5px",
                    marginRight: "5px"
                  }}></i>
                  <div>
                    {(windowDimensions > 990) && <b>Precio de alquiler: </b>}
                    {(windowDimensions < 990) && <b>Precio: </b>} {housemateData.rent + " €"}
                  </div>
                </Row>
              </Col>
              {(windowDimensions > 720) && <Col lg = "4" md = "4" sm = "12" xs = "12">
                <Row style = {{justifyContent: "center"}}>
                  <i className = "now-ui-icons ui-1_calendar-60" style = {{
                    marginTop: "3px",
                    marginRight: "5px"
                  }}></i>
                  <div> {(windowDimensions > 990) &&  <b>Estancia: </b>} {housemateData.startDate.toDate().toLocaleDateString() + " - " + housemateData.endDate.toDate().toLocaleDateString()}
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
                  }}> <b>Limpieza: </b> {housemateData.cleanliness}
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
                  }}> <b>Fiesta: </b> {housemateData.party}
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
                }}>{housemateData.comment}</p>
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
              center = {housemateData.circleLocation}
              circleRadiusProp = {housemateData.circleRadius}/>
              </Collapse>
            </Row>*/}
            {(housemateData.userId !== auth.id) &&
              <Row style = {{margin: "0px", justifyContent: "center"}}>
                <ConnectReqButton auth = {auth} housemateData = {housemateData}/>
            </Row>}
          </Col>
        </Row>
      </Container>
    </Card>
    )
  }

export default Housemate
