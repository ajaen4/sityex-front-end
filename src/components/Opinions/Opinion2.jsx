import React from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Label,
  Container
} from "reactstrap";


const Opinion2 = ({icon, labelName, name1, name2, option1, option2, onChange, register, errors}) => {

  const className = "now-ui-icons " + icon;

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
           }} >{labelName}</h5>
          </div>
        <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            defaultValue = {name1}
            id = {labelName + "1"}
            name = {labelName}
            type="radio"
            innerRef={
              register({
                required: true
              })}
            onChange = {onChange}
          ></Input>
          {option1} <span className="form-check-sign"></span>
        </Label>
        </FormGroup>
        <FormGroup check className="form-check-radio" inline>
          <Label check>
            <Input
              defaultValue = {name2}
              id = {labelName + "2"}
              name = {labelName}
              type="radio"
              innerRef={
                register({
                  required: true
                })}
              onChange = {onChange}
            ></Input>
            {option2} <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
      </Container>
      {errors[labelName] && errors[labelName].type === 'required' &&
      <div
        style = {{
          fontSize: "small",
          color: "red"
        }}>
      {"Se debe introducir la opinion sobre " + labelName}</div>
      }
  </>
    )
  }

export default Opinion2;
