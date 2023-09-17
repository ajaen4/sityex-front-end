import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const StandarModal = ({ title, message }) => {
  const [showModal, setShowModal] = useState(true)
  const toggle = () => setShowModal(!showModal)

  return (
    <Dialog open={showModal} onClose={toggle}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StandarModal
