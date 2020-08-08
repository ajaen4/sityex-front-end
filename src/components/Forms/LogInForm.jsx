
import React from 'react'
import { connect } from 'react-redux'

import LogInFormBase from './LogInFormBase'

const LogInForm = ({dispatch}) => {

  return (
    <>
      <LogInFormBase dispatch = {dispatch}/>
    </>
  )
}

export default connect()(LogInForm)
