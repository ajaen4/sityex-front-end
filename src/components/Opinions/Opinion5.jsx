import React from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Label,
  Container
} from "reactstrap";


const Opinion5 = (props) => {

  const className = "now-ui-icons " + props.icon;

  return (
     <>
     <Container style = {{marginTop: "40px"}}>
       <div className = "rowMainCharact">
         {(!(props.icon === "sun")) && <i className = {className} style = {{
           marginTop: "5px",
           marginRight: "5px"
         }}></i>}
         {(props.icon === "sun") && <img alt = "climate icon" src = {require("assets/icons/sun.png")} style = {{
           marginTop:"3px",
           marginRight: "7px",
           marginLeft: "5px",
           height: "20px"
         }}></img>
        }
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
          type = "radio"
          style = {{margin: "0px"}}
        ></Input>
        1 <span className="form-check-sign"></span>
      </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            id = {props.labelName + "2"}
            name = {props.labelName + "1Options"}
            type= "radio"
            style = {{margin: "0px"}}
          ></Input>
          2 <span className="form-check-sign"></span>
        </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            defaultValue="option3"
            id = {props.labelName + "3"}
            name = {props.labelName + "1Options"}
            type = "radio"
            style = {{margin: "0px"}}
          ></Input>
          3 <span className="form-check-sign"></span>
        </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            defaultValue="option4"
            id = {props.labelName + "4"}
            name = {props.labelName + "1Options"}
            type = "radio"
            style = {{margin: "0px"}}
          ></Input>
          4 <span className="form-check-sign"></span>
        </Label>
      </FormGroup>
      <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            defaultValue="option5"
            id = {props.labelName + "5"}
            name = {props.labelName + "1Options"}
            type = "radio"
            style = {{margin: "0px"}}
          ></Input>
          5 <span className="form-check-sign"></span>
        </Label>
      </FormGroup>
    </Container>
      </>
    )
  }

export default Opinion5;
