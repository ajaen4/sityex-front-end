
import React from 'react'
import { connect } from 'react-redux'

import SignUpFormBase from './SignUpFormBase'

const SignUpForm = ({dispatch}) => {

  return (
    <>
      <SignUpFormBase dispatch = {dispatch}/>
    </>
  )
}

export default connect()(SignUpForm)
