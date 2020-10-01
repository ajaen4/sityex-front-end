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
     <>
       <Container style = {{marginTop: "40px"}}>
         <h5>{title}</h5>
         <Row style = {{
           justifyContent: "center"
           }}>
           <FormGroup>
             <InputGroup>
               <Input style = {{textAlign: "center"}}
                 name = {name}
                 disabled = {disabled}
                 placeholder = {placeHolder}
                 type = "text"
                 invalid = {disabled === false && errors[name] !== undefined}
                 innerRef = {
                   register({
                     required: true,
                     validate: { isANumber: value => !isNaN(value) }
                   })}/>
               <InputGroupAddon addonType="append">
                 <InputGroupText>
                   <i className = {"now-ui-icons " + iconName}></i>
                 </InputGroupText>
               </InputGroupAddon>
             </InputGroup>
            {disabled === false && errors[name] && errors[name].type === 'required' &&
            <div
              style = {{
                fontSize: "small",
                color: "red"
              }}>Se debe rellenar</div>
            }
            {disabled === false && errors[name] && errors[name].type === 'isANumber' &&
            <div
              style = {{
                fontSize: "small",
                color: "red"
              }}>El valor debe ser un numero</div>
            }
           </FormGroup>
         </Row>
      </Container>
    </>
    )
  }

export default InputWithIcon
