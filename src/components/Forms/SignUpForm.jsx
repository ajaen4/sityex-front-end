
import React, { useEffect, useState } from 'react'


import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'

//Custom functionality
import { sameAs } from "helpers/validators.js"
import { objectIsEmpty } from 'helpers/usefulFunctions'
import { createUser } from 'actions'
import * as ROUTES from 'constants/routes'

//reactstrap components
import{
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormFeedback
} from "reactstrap"

//Custom components
import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import { DismissAlert } from 'components/Alerts/'

const SignUpFormBase = ({history}) => {

  const {register, handleSubmit, errors, getValues} = useForm()

  const [isFetching, setIsFetching] = useState(false)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleForm = data => {
    setIsFetching(true)
    createUser(data)
    .then(user => {
      setUser(user)
      setIsFetching(false)
    }, errorMessage => {
      setErrorMessage(errorMessage)
      setIsFetching(false)
    })
  }

  useEffect(() => {
    if(!objectIsEmpty(user))
      setTimeout(() => history.push(ROUTES.HOME), 3000)
  }, [user, history])

  if(isFetching)
    return <LoadingSpinner/>

  if(user){
    return <DismissAlert
            color = "success"
            message = {"El usuario con email " + user.email +  " se ha creado correctamente"}
            />
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
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
                //eslint-disable-next-line
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
          invalid={errors.userName !== undefined}
          innerRef={
            register({
              required: true
              })}
          name = "userName"
          placeholder="Nombre de usuario..."
          type="text"
        ></Input>
        {errors.userName && errors.userName.type === 'required' &&
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
    {(errorMessage !== "") && <DismissAlert color = "danger" message = {errorMessage}/>}
  </>
  )
}

const mapStateToProps = state => ({
  user: state.createUser.data,
  isFetching: state.createUser.isFetching,
  errorMessage: state.createUser.errorMessage
})

const SignUpForm = connect(mapStateToProps)(withRouter(SignUpFormBase))

export default SignUpForm
