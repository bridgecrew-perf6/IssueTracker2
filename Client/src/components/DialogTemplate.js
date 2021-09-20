import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'
// import { useDispatch } from 'react-redux'

function DialogTemplate({
  title,
  contentText,
  actionBtnText,
  trigger,
  actionFunc,
  dialogType,
  children,
}) {

  const [modalShow, setModalShow] = useState(false)
  const handleModalClose = () => {
    setModalShow(false)
  }
  const handleModalOpen = () => setModalShow(true)
  const handleConfirmedAction = () => {
    actionFunc()
    handleModalClose()
  }

  const triggerButton = () => {
    switch (trigger.type) {
      case "icon":
        return (
          <i
            className={`bi ${trigger.icon}`}
            onClick={handleModalOpen}
            style={trigger.iconStyle}
          >
          </i>
        )
      case "menu":
        return (
          <Dropdown.Item onClick={handleModalOpen} >
            <i style={trigger.iconStyle} className={`bi ${trigger.icon}`}></i>
            {trigger.text}
          </Dropdown.Item>
        )
      default: 
          return (
            <Button onClick={handleModalOpen}>
              {trigger.icon && <i style={trigger.iconStyle} className={`bi ${trigger.icon}`}></i>}
              {trigger.text}
            </Button>
          )
    }
  }

  const proppedChildren = React.isValidElement(children)
  ? React.cloneElement(children, {
      closeModal: handleModalClose,
    })
  : children

  return (
    <div>
      {triggerButton()}
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header >
          <Modal.Title>{title}</Modal.Title>
          <i onClick={handleModalClose} className="bi bi-x-lg"></i>
        </Modal.Header>
        <Modal.Body>
          {dialogType === "form" ? proppedChildren : contentText}
        </Modal.Body>
        {dialogType !== "form" &&
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirmedAction}>
              {actionBtnText}
            </Button>
          </Modal.Footer>
        }
      </Modal>
    </div>
  )
}

export default DialogTemplate