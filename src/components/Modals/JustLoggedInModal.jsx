import React from 'react'
import { connect } from 'react-redux'

import {justLoggedInShown} from 'actions'

import JustLoggedInModalBase from './JustLoggedInModalBase'

const JustLoggedInModal = ({title, message, justLoggedIn, dispatch}) => {

  const toggleJustLoggedIn = () => {
    dispatch(justLoggedInShown())
  }

  return (
      <JustLoggedInModalBase title = {title} message = {message} justLoggedIn = {justLoggedIn} justLoggedInShown = {toggleJustLoggedIn} />
  )
}

export default connect()(JustLoggedInModal)
