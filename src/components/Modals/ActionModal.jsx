import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'

const ActionModal = ({title, message, show, action}) => {

  const [showModal, setShowModal] = useState(show)

  const toggle = () => {
    setShowModal(!showModal)
    debugger
    action()
  }

  return (
      <Modal isOpen={showModal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Aceptar</Button>
        </ModalFooter>
      </Modal>
  )
}

export default ActionModal
