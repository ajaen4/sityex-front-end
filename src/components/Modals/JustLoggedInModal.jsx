import React from 'react'
import { connect } from 'react-redux'

import {justLoggedInShown} from 'actions'

import ActionModal from './ActionModal'

const JustLoggedInModal = ({title, message, justLoggedIn, dispatch}) => {

  const action = () => {
    dispatch(justLoggedInShown())
  }

  return (
      <ActionModal title = {title} message = {message} show = {justLoggedIn} action = {action} />
  )
}

export default connect()(JustLoggedInModal)
