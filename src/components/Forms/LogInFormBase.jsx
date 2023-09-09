import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { logInUser } from 'actions'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import LoadingSpinner from 'components/Spinner/LoadingSpinner.jsx'
import StandarModal from 'components/Modals/StandarModal'

const LogInFormBase = ({dispatch}) => {
  const {register, handleSubmit, formState: { errors }} = useForm()
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const signInUser = data => {
    setIsFetching(true)
    dispatch(logInUser(data))
    .then(user => {
      setIsFetching(false)
    }, errorMessage => {
      setErrorMessage(errorMessage)
      setIsFetching(false)
    })
  }

  const defaultTheme = createTheme()

  if(isFetching)
    return <LoadingSpinner/>
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            width: "80%",
          }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors.email !== undefined}
                {...register("email", {
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                placeholder="Email..."
                type="email"
                autoFocus
              />
              <Stack>
              {errors.email && errors.email.type === 'required' &&
                <Alert severity="error">Se debe introducir el email</Alert>
              }
              {errors.email && errors.email.type === 'pattern' &&
                <Alert severity="error">El formato del email no es valido</Alert>
              }
              </Stack>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.password !== undefined}
              {...register("password", {
                required: true,
                minLength: 8
              })}
              placeholder="Password..."
              />
              <Stack>
              {errors.password && errors.password.type === 'required' &&
                <Alert severity="error">Se debe introducir la contraseña</Alert>
              }
              {errors.password && errors.password.type === 'minLength' &&
                <Alert severity="error">La contraseña debe tener como minimo 8 caracteres</Alert>
              }
              </Stack>
            <Button
              disabled = {Object.keys(errors).length !== 0}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
            message = {errorMessage}
            />}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LogInFormBase
