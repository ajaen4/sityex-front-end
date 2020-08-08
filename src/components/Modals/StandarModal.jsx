import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap'

const StandarModal = ({title, message}) => {

  const [showModal, setShowModal] = useState(true)

  const toggle = () => setShowModal(!showModal)

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

export default StandarModal
