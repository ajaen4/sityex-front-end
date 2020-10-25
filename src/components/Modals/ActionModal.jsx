import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'

const ActionModal = ({show, title, message, action}) => {

  const [showModal, setShowModal] = useState(show)

  const toggle = () => {
    setShowModal(!showModal)
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
