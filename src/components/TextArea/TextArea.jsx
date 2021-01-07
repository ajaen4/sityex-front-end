import React from "react";

// reactstrap components
import {
  Input,
  FormFeedback
} from "reactstrap";


const TextArea = ({name, register, errors}) => {

  return (
    <>
      <Input
        style = {{
          fontSize: "large"
        }}
        name = {name}
        bsSize="lg"
        id="textArea"
        rows="5"
        type="textarea"
        invalid = {errors[name] !== undefined}
        innerRef={
          register({
            required: true,
            maxLength: 300,
            pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð !¡?¿:,.()'-]+$/u
          })}/>
        {errors[name] && errors[name].type === 'required' &&
        <FormFeedback>Se debe introducir al menos un consejo</FormFeedback>
        }
        {errors[name] && errors[name].type === 'maxLength' &&
        <FormFeedback>{"El " + name + " puede tener como maximo 300 caracteres"}</FormFeedback>
        }
        {errors[name] && errors[name].type === 'pattern' && <FormFeedback>Existen caracteres no permitidos</FormFeedback>
        }
      </>
    )
  }

export default TextArea
