import React from "react"

// reactstrap components
import {
  FormGroup,
  Input,
  Container,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap"


const InputWithIcon = ({name, title, placeHolder, iconName, disabled, register, errors}) => {

  return (
       <Container style = {{marginTop: "40px"}}>
         <h5>{title}</h5>
         <Row style = {{
           justifyContent: "center"
           }}>
           <FormGroup>
             <InputGroup>
               <Input style = {{textAlign: "center"}}
                 name = {name}
                 disabled = {disabled || false}
                 placeholder = {placeHolder}
                 type = "text"
                 invalid = {((disabled === false) || (disabled === null)) && errors[name] !== undefined}
                 innerRef = {
                   register({
                     required: true,
                     validate: { isANumber: value => !isNaN(value) }
                   })}/>
               <InputGroupAddon addonType="append">
                 <InputGroupText>
                   {iconName !== "people" && <i className = {"now-ui-icons " + iconName}></i>}
                   {(iconName === "people") &&
                   <img alt = "city icon" src = {require("assets/icons/people.png")} style = {{
                     height: "18px"
                   }}></img>
                    }
                 </InputGroupText>
               </InputGroupAddon>
             </InputGroup>
            {errors[name] && errors[name].type === 'required' &&
            <div
              style = {{
                fontSize: "small",
                color: "red"
              }}>Se debe rellenar</div>
            }
            {errors[name] && errors[name].type === 'isANumber' &&
            <div
              style = {{
                fontSize: "small",
                color: "red"
              }}>El valor debe ser un numero</div>
            }
           </FormGroup>
         </Row>
      </Container>
    )
  }

export default InputWithIcon
