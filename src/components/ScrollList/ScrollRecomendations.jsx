
import React from "react";

import ReactList from 'react-list';

// reactstrap components
import {
  Button,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";


function ScrollRecomendations(props){

  const [recomendations, setRecomendations] = React.useState(props.currRecomendations);
  const [scrollHeight, setScrollHeight] = React.useState("0px");

  React.useEffect(() => {

    if(props.windowWidth < 800 && props.currRecomendations.length === 0){
      setScrollHeight("0px");
    }
    else{
    setScrollHeight(props.windowWidth > 800 ? "500px" : "200px");
    }
    setRecomendations(props.currRecomendations);

  }, [props]);

  const deleteRec = (event) => {
    props.deleteRec(parseInt(event._targetInst.key));
  };

  const renderItem = (index, key) => {
    return <Card style = {{
              width: "80%",
              marginTop: "5px",
              marginBottom: "5px"
            }}>
            <CardBody
            key = {recomendations[index].name.trim()}>
              <Row style = {{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                  }}
                  key={key}>
                <Col lg = "3" md = "12" sm = "12" style = {{maxWidth: "70px"}} >
                <img  alt = "recomendations from users" src = {require("assets/icons/pin_blue.png")} ></img>
                </Col>
                <div lg = "6" md = "12" sm = "12" style = {{
                  textAlign: "center"
                }}>
                  {recomendations[index].name.trim()}
                </div>
                <Col lg = "3" md = "12" sm = "12">
                <Button className="btn-round btn-icon" color="danger" onClick = {deleteRec} >
                  <i key = {index} className="now-ui-icons ui-1_simple-remove" />
                </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>;
        }

  return (
    <>
    <div style = {{overflow: 'auto', height: scrollHeight, justifyContent: "center"}}>
      <ReactList style = {{marginTop: "10px", marginBottom: "10px", justifyContent: "center"}}
      itemRenderer = {renderItem}
      length = {recomendations.length}
      type = 'uniform'
      />
    </div>
    </>
  );

}

export default ScrollRecomendations;
