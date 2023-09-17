import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const ActionModal = ({ show, title, message, action }) => {
  const [showModal, setShowModal] = useState(show)

  const toggle = () => {
    setShowModal(!showModal)
    action()
  }

  return (
    <Dialog open={showModal} onClose={toggle}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={toggle}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ActionModal
