import React from 'react'

//Custom functionality
import { withoutAuth } from 'session'

import SignUpForm from "components/Forms/SignUpForm.jsx"

const SignUpPageBase = () => {

    return (
      <SignUpForm/>
    )
}

export default withoutAuth(SignUpPageBase)
