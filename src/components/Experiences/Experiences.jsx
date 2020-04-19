
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Row
} from "reactstrap";


const Experience = (props) => {

  //const [experienceData, setExperienceData] = React.useState(props.experienceData);


  /*if(experienceData === null) return null;
  else {*/
    return (

      <>
          <Card>
            <CardBody>
            <Row>
              <div style = {{justifyContent: "flex-start"}} >
                <img className="photo-experience" alt="..." src={require("assets/img/ryan.jpg")}></img>
              </div>
              <div style = {{
                margin: "10px"
              }}>
              Me encanto la ciudad de turin es increible..<br/>Recomendaciones:
              </div>
            </Row>
              </CardBody>
            </Card>
      </>
      );
  }

export default Experience;
