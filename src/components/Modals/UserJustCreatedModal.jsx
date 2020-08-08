import React from 'react'
import { connect } from 'react-redux'

import {userJustCreatedShown} from 'actions'

import ActionModal from './ActionModal'

const UserJustCreatedModal = ({title, message, userJustCreated, dispatch}) => {

  const action = () => {
    dispatch(userJustCreatedShown())
  }

  return (
      <ActionModal title = {title} message = {message} show = {userJustCreated} action = {action} />
  )
}

export default connect()(UserJustCreatedModal)
