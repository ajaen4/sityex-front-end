import React from 'react'

//Custom functionality
import { withoutAuth } from 'session'

//Custom UI components
import LogInForm from "components/Forms/LogInForm.jsx"

const LogInPageBase = () => {

  return (
    <LogInForm/>
  )
}

export default withoutAuth(LogInPageBase)
