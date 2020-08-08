import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'

const JustLoggedInModalBase = ({title, message, justLoggedIn, justLoggedInShown}) => {

  const [showModal, setShowModal] = useState(justLoggedIn)

  const toggle = () => {
    setShowModal(!showModal)
    debugger
    justLoggedInShown()
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

export default JustLoggedInModalBase
