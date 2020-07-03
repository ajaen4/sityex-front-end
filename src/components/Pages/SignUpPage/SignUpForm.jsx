
import React from 'react'

import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { withFirebase } from 'apis/Firebase'

import{
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormFeedback
} from "reactstrap"

import { sameAs } from "helpers/validators.js"

const SignUpFormBase = (props) => {

  const {register, handleSubmit, errors, getValues} = useForm()

  const createUser = data => {
    console.log(data)

    /*props.firebase
      .doSignInWithEmailAndPassword(data.email, data.password)
      .then(authUser => {
        props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        //setError(error)
      })*/

  }

  return (
      <form onSubmit={handleSubmit(createUser)}>
        <InputGroup
          className = "no-border input-lg input-group-focus"
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons users_circle-08"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            invalid={errors.email !== undefined}
            innerRef={
              register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
            name = "email"
            placeholder="Email..."
            type="email"
          ></Input>
          {errors.email && errors.email.type === 'required' &&
          <FormFeedback>Se debe introducir el email</FormFeedback>
          }
          {errors.email && errors.email.type === 'pattern' &&
          <FormFeedback>El formato del email no es valido</FormFeedback>
          }
      </InputGroup>
      <InputGroup
        className = "no-border input-lg input-group-focus"
      >
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="now-ui-icons users_circle-08"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input
          invalid={errors.username !== undefined}
          innerRef={
            register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
          name = "username"
          placeholder="Nombre de usuario..."
          type="text"
        ></Input>
        {errors.username && errors.username.type === 'required' &&
        <FormFeedback>Se debe introducir el nombre de usuario</FormFeedback>
        }
    </InputGroup>
      <InputGroup
          className = "no-border input-lg input-group-focus"
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_lock-circle-open"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            invalid={errors.password !== undefined}
            innerRef={
              register({
                required: true,
                minLength: 8})}
            name = "password"
            placeholder="Contraseña..."
            type="password"
          ></Input>
          {errors.password && errors.password.type === 'required' &&
          <FormFeedback>Se debe introducir la contraseña</FormFeedback>
          }
          {errors.password && errors.password.type === 'minLength' &&
          <FormFeedback>La contraseña debe tener como minimo 8 caracteres</FormFeedback>
          }
      </InputGroup>
      <InputGroup
          className = "no-border input-lg input-group-focus"
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_lock-circle-open"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            invalid={errors.confirmPassword !== undefined}
            innerRef={
              register({
                required: true,
                minLength: 8,
                validate: {
                  sameAs: sameAs(getValues, "password")
                }})}
            name = "confirmPassword"
            placeholder="Confirmacion de contraseña..."
            type="password"
          ></Input>
          {errors.confirmPassword && errors.confirmPassword.type === 'required' &&
          <FormFeedback>Se debe introducir la contraseña</FormFeedback>
          }
          {errors.confirmPassword && errors.confirmPassword.type === 'minLength' &&
          <FormFeedback>La contraseña debe tener como minimo 8 caracteres</FormFeedback>
          }
          {errors.confirmPassword && errors.confirmPassword.type === 'sameAs' &&
          <FormFeedback>Las contraseñas deben de ser iguales</FormFeedback>
          }
      </InputGroup>
      <Button
        color = "success"
        type="submit"
        style={{ margin: "2%" }}
      >
        Crea una cuenta
      </Button>
    </form>
  )
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpForm
