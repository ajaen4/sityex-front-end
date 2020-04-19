import React from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Label,
  Container
} from "reactstrap";


const Opinion2 = (props) => {

  const className = "now-ui-icons " + props.icon;

  return (
     <>
     <Container style = {{marginTop: "40px"}}>
       <div className = "rowMainCharact">
         <i className = {className} style = {{
           marginTop: "5px",
           marginRight: "5px"
         }}></i>
         <h5 style = {{
           marginBottom: "0px"
         }} >{props.labelName}</h5>
        </div>
      <FormGroup check className="form-check-radio" inline>
      <Label check>
        <Input
          defaultValue = "option1"
          id = {props.labelName + "1"}
          name = {props.labelName + "1Options"}
          type="radio"
        ></Input>
        {props.option1} <span className="form-check-sign"></span>
      </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            id = {props.labelName + "2"}
            name = {props.labelName + "1Options"}
            type="radio"
          ></Input>
          {props.option2} <span className="form-check-sign"></span>
        </Label>
      </FormGroup>
    </Container>
      </>
    )
  }

export default Opinion2;
