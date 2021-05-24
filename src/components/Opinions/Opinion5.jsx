import React from "react"

// reactstrap components
import {
  FormGroup,
  Input,
  Label,
  Container,
  Row
} from "reactstrap"


const Opinion5 = ({icon, fieldName, labelName, errorName, register, errors}) => {

  const style = {marginRight: "0.5em", marginLeft: "0px", padding: "0px"}
  const className = "now-ui-icons " + icon
  return (
       <Container style = {{
         marginTop: "30px",
         marginRight: "0px",
         marginLeft: "0px",
         paddingLeft: "0px",
         paddingRight: "0px"
       }}

       >
         <div className = "rowMainCharact">
           {((icon !== "sun") && (icon !== "broom")) && <i className = {className} style = {{
             marginTop: "5px",
             marginRight: "5px"
           }}></i>}
           {((icon === "sun") || (icon === "broom")) && <img alt = "climate icon" src = {require("assets/icons/"+ icon + ".png")} style = {{
             marginTop:"3px",
             marginRight: "7px",
             marginLeft: "5px",
             height: "20px"
           }}></img>}
           <h5 style = {{
             marginBottom: "0px"
           }} >{labelName}</h5>
         </div>
         <Row style = {{justifyContent: "center", marginLeft: "0px", marginRight: "0px"}}>
           <FormGroup check className="form-check-radio" inline style = {style}>
             <Label check style = {{margin: "0px"}}>
               <Input
                 defaultValue = "1"
                 id = {fieldName + "1"}
                 name = {fieldName}
                 type = "radio"
                 style = {{margin: "0px"}}
                 innerRef={
                   register({
                     required: true
                   })}
               ></Input>1<span className="form-check-sign"></span>
             </Label>
           </FormGroup>
           <FormGroup check className="form-check-radio" inline style = {style}>
             <Label check>
               <Input
                 defaultValue = "2"
                 id = {fieldName + "2"}
                 name = {fieldName}
                 type= "radio"
                 style = {{margin: "0px"}}
                 innerRef={
                   register({
                     required: true
                   })}
               ></Input>2<span className="form-check-sign"></span>
             </Label>
           </FormGroup>
           <FormGroup check className="form-check-radio" inline style = {style}>
             <Label check>
               <Input
                 defaultValue = "3"
                 id = {fieldName + "3"}
                 name = {fieldName}
                 type = "radio"
                 style = {{margin: "0px"}}
                 innerRef={
                   register({
                     required: true
                   })}
               ></Input>3<span className="form-check-sign"></span>
             </Label>
           </FormGroup>
           <FormGroup check className="form-check-radio" inline style = {style}>
             <Label check>
               <Input
                 defaultValue="4"
                 id = {fieldName + "4"}
                 name = {fieldName}
                 type = "radio"
                 style = {{margin: "0px"}}
                 innerRef={
                   register({
                     required: true
                   })}
               ></Input>4<span className="form-check-sign"></span>
             </Label>
           </FormGroup>
           <FormGroup check className="form-check-radio" inline style = {style}>
             <Label check>
               <Input
                 defaultValue="5"
                 id = {fieldName + "5"}
                 name = {fieldName}
                 type = "radio"
                 style = {{margin: "0px"}}
                 innerRef={
                   register({
                     required: true
                   })}
               ></Input>5<span className="form-check-sign"></span>
             </Label>
           </FormGroup>
         </Row>

         {errors[fieldName] && errors[fieldName].type === 'required' &&
           <div
             style = {{
               fontSize: "small",
               color: "red"
             }}>
             {"Se debe introducir la opinion sobre " + (errorName === undefined ? labelName : errorName)}</div>
         }
       </Container>
    )
  }

export default Opinion5
