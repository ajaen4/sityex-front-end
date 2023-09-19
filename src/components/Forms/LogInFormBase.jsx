import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { logInUser } from 'actions'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

import StandarModal from 'components/Modals/StandarModal'
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'

const LogInFormBase = ({dispatch}) => {
  const {register, handleSubmit, formState: { errors }, reset} = useForm()
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const signInUser = data => {
    setIsFetching(true)
    dispatch(logInUser(data))
    .then(user => {
    }, errorMessage => {
      setErrorMessage(errorMessage)
      setIsFetching(false)
      reset()
    })
  }

  if(isFetching)
    return <CenteredLoadingSpinner/>
  
  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(signInUser)} noValidate sx={{ 
            mt: 1,
            width: "83%",
          }}>
            <FormControl fullWidth  error={Boolean(errors.email)}>
              <TextField
                
                required
                fullWidth
                label="Email Address"
                placeholder="Email..."
                type="email"
                autoFocus
                error={errors.email !== undefined}
                {...register("email", {
                  required: "Se debe introducir el email",
                  pattern: {
                    value: /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "El email introducido no es válido"
                  }
                })}
              />
              <FormHelperText style={{minHeight: "30px"}}>{errors.email?.message}</FormHelperText>
            </FormControl>
            <FormControl fullWidth  error={Boolean(errors.password)}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                placeholder="Password..."
                {...register("password", {
                  required: 'Se debe introducir la contraseña',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener como mínimo 8 caracteres'
                  },
                })}
              />
                <FormHelperText style={{minHeight: "30px"}}>{errors.password?.message}</FormHelperText>
            </FormControl>
            <Button
              disabled = {Object.keys(errors).length !== 0}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {(errorMessage !== null) &&
            <StandarModal
            color = "error"
            style = {{
              marginTop: "15px"
            }}
            title = {"Incorrect authentication. "}
            message = {errorMessage.message}
            />}
        </Box>
      </Container>
  )
}

export default LogInFormBase
