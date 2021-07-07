import React from "react"

// reactstrap components
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from "reactstrap"


const InputIconLeft = ({register, errors, orgValue, fieldName, label}) => {

  const [value, setValue] = React.useState(orgValue)

  const handleChange = event => setValue(event.target.value)

  return (
    <>
      <label htmlFor = {fieldName} style = {{fontSize: "1.2em"}}>{label}</label>
      <InputGroup
        className = "input-lg input-group-focus"
      >
        <InputGroupAddon addonType="prepend" >
          <InputGroupText>
            {((fieldName === "name") || (fieldName === "surname")) &&
              <i className="now-ui-icons users_circle-08"></i>
            }
            {(fieldName === "email") &&
              <i className="now-ui-icons ui-1_email-85"></i>
            }
            {(fieldName === "city") &&
              <img alt = "city icon" src = {require("assets/icons/city.png")} style = {{
                height: "18px"
              }}></img>
            }
            {(fieldName === "country") &&
              <i className="now-ui-icons business_globe"></i>
            }
          </InputGroupText>
        </InputGroupAddon>
        <Input
          style = {{
            fontSize: "1em"
          }}s
          invalid={errors.name !== undefined}
          innerRef={
             register({
               required: true,
               pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
               })}
           name = {fieldName}
           value = {value}
           onChange = {handleChange}
           type = "text"
         ></Input>
         {errors[fieldName] && errors[fieldName].type === 'required' &&
         <FormFeedback>{"Se debe introducir el" + fieldName}</FormFeedback>
         }
         {errors[fieldName] && errors[fieldName].type === 'pattern' &&
         <FormFeedback>El formato no es valido</FormFeedback>
         }
     </InputGroup>
     </>
    )
  }

export default InputIconLeft
