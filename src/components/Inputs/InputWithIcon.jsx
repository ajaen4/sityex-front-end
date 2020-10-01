import React, {useState} from "react"

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


const InputWithIcon = ({title, placeHolder, iconName, onChangeValue, register, errors}) => {

  const [inputValue, setInputValue] = useState("")

  const onChange = event => {
    //onChangeValue(event)
    setInputValue(event.target.value)
  }

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
               name = {title}
               placeholder = {placeHolder}
               type = "text"
               value= {inputValue}
               onChange = {onChange}
               invalid = {errors[title] !== undefined}
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
            {errors[title] && errors[title].type === 'required' &&
            <div
              style = {{
                fontSize: "small",
                color: "red"
              }}>Se debe rellenar</div>
            }
            {errors[title] && errors[title].type === 'isANumber' &&
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
