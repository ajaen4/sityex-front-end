import React from 'react'
import { Container } from '@mui/material'

//Custom functionality
import { withoutAuth } from 'session'

//Custom UI components
import LogInForm from "components/Forms/LogInForm.jsx"

const LogInPageBase = () => {

  return (
    <Container style={{minHeight: "73vh"}}>
      <LogInForm/>
    </Container>
  )
}

export default withoutAuth(LogInPageBase)