import React from "react"

// reactstrap components
import {
  FormGroup,
  Input,
  Label,
  Container
} from "reactstrap"


const Opinion5 = ({icon, labelName, register, errors}) => {

  const className = "now-ui-icons " + icon
  return (
     <>
       <Container style = {{marginTop: "30px"}}>
         <div className = "rowMainCharact">
           {(!(icon === "sun")) && <i className = {className} style = {{
             marginTop: "5px",
             marginRight: "5px"
           }}></i>}
           {(icon === "sun") && <img alt = "climate icon" src = {require("assets/icons/sun.png")} style = {{
             marginTop:"3px",
             marginRight: "7px",
             marginLeft: "5px",
             height: "20px"
           }}></img>
          }
           <h5 style = {{
             marginBottom: "0px"
           }} >{labelName}</h5>
         </div>
        <FormGroup check className="form-check-radio" inline>
        <Label check>
          <Input
            defaultValue = "option1"
            id = {labelName + "1"}
            name = {labelName + "Options"}
            type = "radio"
            style = {{margin: "0px"}}
            innerRef={
              register({
                required: true
              })}
          ></Input>
          1 <span className="form-check-sign"></span>
        </Label>
        </FormGroup>
        <FormGroup check className="form-check-radio" inline>
          <Label check>
            <Input
              id = {labelName + "2"}
              name = {labelName + "Options"}
              type= "radio"
              style = {{margin: "0px"}}
              innerRef={
                register({
                  required: true
                })}
            ></Input>
            2 <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
        <FormGroup check className="form-check-radio" inline>
          <Label check>
            <Input
              defaultValue="option3"
              id = {labelName + "3"}
              name = {labelName + "Options"}
              type = "radio"
              style = {{margin: "0px"}}
              innerRef={
                register({
                  required: true
                })}
            ></Input>
            3 <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
        <FormGroup check className="form-check-radio" inline>
          <Label check>
            <Input
              defaultValue="option4"
              id = {labelName + "4"}
              name = {labelName + "Options"}
              type = "radio"
              style = {{margin: "0px"}}
              innerRef={
                register({
                  required: true
                })}
            ></Input>
            4 <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
        <FormGroup check className="form-check-radio" inline>
          <Label check>
            <Input
              defaultValue="option5"
              id = {labelName + "5"}
              name = {labelName + "Options"}
              type = "radio"
              style = {{margin: "0px"}}
              innerRef={
                register({
                  required: true
                })}
            ></Input>
            5 <span className="form-check-sign"></span>
          </Label>
        </FormGroup>
      </Container>
      {errors[labelName + 'Options'] && errors[labelName + 'Options'].type === 'required' &&
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

export default Opinion5
