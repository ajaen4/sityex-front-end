import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField, FormControl, FormHelperText, Grid, Link } from '@mui/material'

import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'
import StandarModal from 'components/Modals/StandarModal'
import { createUser } from 'actions'
import { sameAs } from 'helpers/validators'

const SignUpFormBase = ({dispatch}) => {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm()

  const [isFetching, setIsFetching] = useState(false)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const signUpUser = data => {
    setIsFetching(true)
    dispatch(createUser(data))
    .then(user => {
      setUser(user)
      setIsFetching(false)
    }, error => {
      setErrorMessage(error)
      setIsFetching(false)
    })
  }

  if (isFetching) return <CenteredLoadingSpinner />

  if (user) {
    return <StandarModal
      title="Usuario creado"
      message={"El usuario con email " + user.email + " se ha creado correctamente"}
    />
  }

  const defaultTheme = createTheme()

  
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
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit(signUpUser)} noValidate sx={{ 
              mt: 1,
              width: "80%",
            }}>
        <FormControl fullWidth margin="normal" error={Boolean(errors.email)}>
          <TextField
            {...register('email', {
              required: 'Se debe introducir el email',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'El formato del email no es valido'
              }
            })}
            label="Email"
            variant="outlined"
          />
          <FormHelperText>{errors.email?.message}</FormHelperText>
        </FormControl>
        
        <FormControl fullWidth margin="normal" error={Boolean(errors.userName)}>
          <TextField
            {...register('userName', {
              required: 'Se debe introducir el nombre de usuario'
            })}
            label="Nombre de usuario"
            variant="outlined"
          />
          <FormHelperText>{errors.userName?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" error={Boolean(errors.password)}>
          <TextField
            {...register('password', {
              required: 'Se debe introducir la contraseña',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener como mínimo 8 caracteres'
              }
            })}
            label="Contraseña"
            variant="outlined"
            type="password"
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" error={Boolean(errors.confirmPassword)}>
          <TextField
            {...register('confirmPassword', {
              required: 'Se debe introducir la contraseña',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener como mínimo 8 caracteres'
              },
              validate: {
                sameAs: value => sameAs(getValues, 'password')(value) || 'Las contraseñas deben de ser iguales'
              }
            })}
            label="Confirmación de Contraseña"
            variant="outlined"
            type="password"
          />
          <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
        </FormControl>
        <Grid container sx={{my: 1}}>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Log In"}
            </Link>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: '2%' }}
          >
            Crea una cuenta
          </Button>
        </Box>
      </Box>
      {(errorMessage !== null) &&
        <StandarModal title="Error" message={errorMessage} />
      }
      </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUpFormBase