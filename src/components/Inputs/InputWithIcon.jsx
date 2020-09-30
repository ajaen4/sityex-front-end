import React, {useState} from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Container,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";


const InputWithIcon = ({title, placeHolder, iconName, onChangeValue}) => {

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
             placeholder = {placeHolder}
             type = "text"
             value= {inputValue}
             onChange = {onChange}/>
             <InputGroupAddon addonType="append">
               <InputGroupText>
                 <i className = {"now-ui-icons " + iconName}></i>
               </InputGroupText>
             </InputGroupAddon>
           </InputGroup>
         </FormGroup>
       </Row>
    </Container>
      </>
    )
  }

export default InputWithIcon;
