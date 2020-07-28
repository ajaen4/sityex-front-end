
import React, { useEffect } from 'react'

import { withRouter } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

//Custom functionality
import * as ROUTES from 'constants/routes'
import { logInUser } from 'actions'
import { objectIsEmpty } from 'helpers/usefulFunctions'

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

const LogInFormBase = ({dispatch, user, isFetching, errorMessage, history}) => {

  const {register, handleSubmit, errors} = useForm()

  useEffect(() => {
    if(!objectIsEmpty(user))
      setTimeout(() => history.push(ROUTES.HOME), 2000)
  }, [user, history])

  const signInUser = data => {
    console.log(data)
    dispatch(logInUser(data))
  }

  if(isFetching)
    return <LoadingSpinner/>

  if(!objectIsEmpty(user))
    return <DismissAlert color = "success" message = {"Se ha iniciado sesion correctamente"}/>

  return (
      <>
        <form onSubmit={handleSubmit(signInUser)}>
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
                <i className="now-ui-icons ui-1_lock-circle-open"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              invalid={errors.password !== undefined}
              innerRef={
                register({
                  required: true,
                  minLength: 4})}
              name = "password"
              placeholder="Password..."
              type="password"
            ></Input>
            {errors.password && errors.password.type === 'required' &&
            <FormFeedback>Se debe introducir la contraseña</FormFeedback>
            }
            {errors.password && errors.password.type === 'minLength' &&
            <FormFeedback>La contraseña debe tener como minimo 8 caracteres</FormFeedback>
            }
        </InputGroup>
        <Button
          disabled = {Object.keys(errors).length !== 0}
          color = "success"
          style = {{ margin: "2%" }}
          type = "submit"
        >
          Log In
        </Button>
        <Button
          color="white"
          href="signup"
          style={{ margin: "2%" }}
        >
          Crea una cuenta
        </Button>
      </form>
    {(errorMessage !== "") &&
      <DismissAlert
      color = "danger"
      style = {{
        marginTop: "15px"
      }}
      message = {errorMessage}
      />}
    </>
  )
}

const mapStateToProps = state => ({
  user: state.logInUser.data,
  isFetching: state.logInUser.isFetching,
  errorMessage: state.logInUser.errorMessage
})

const LogInForm = connect(mapStateToProps)(withRouter(LogInFormBase))

export default LogInForm
