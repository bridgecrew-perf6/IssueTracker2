import React, { useState, useMemo } from 'react'
import { deleteProject } from '../store/actions/projectActions'
import ProjectForm from '../components/ProjectForm'
import { removeError } from '../store/actions/errorActions'
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'
import TestTable from '../components/TestTable'
import { projectColumns } from '../data/columns'
import { useDispatch, useSelector } from 'react-redux'
import DialogTemplate from '../components/DialogTemplate'
import '../styles/allProjects.css'

function AllProjects({ history }) {
  const [edit, setEdit] = useState(false)
  const { users, errors, projects } = useSelector(state => state)
  const dispatch = useDispatch()
  const [projectId, setProjectId] = useState("")
  const [show, setShow] = useState({
    createModal: false,
    removeModal: false
  });

  const handleClick = (e, value) => {
    switch (e.target.name) {
      case "view":
        history.push(`/projects/${value}`)
        break
      case "edit":
        setEdit(true)
        setProjectId(value)
        setShow(prev => ({ ...prev, createModal: true }))
        break
      case "remove":
        setProjectId(value)
        setShow(prev => ({ ...prev, removeModal: true }))
        break
      default:
        return
    }
  }
  const handleClose = () => setShow(prev => ({ ...prev, removeModal: false }))
  history.listen(() => {
    dispatch(removeError())
  })
  const columns = useMemo(() => (
    [...projectColumns, {
      Header: "functions",
      accessor: "_id",
      Cell: ({ value }) => (
        <>
          <button onClick={(e) => handleClick(e, value)} name="view">View</button>
          <button onClick={(e) => handleClick(e, value)} name="edit">edit</button>
          <button onClick={(e) => handleClick(e, value)} name="remove">remove</button>
        </>
      )
    }]
  ), [])
  const data = useMemo(() => projects ? projects : [], [projects])
  const projectDetails = projects.find(project => project._id === projectId)

  return (
    <div className="allProjectsContainer">
      <h1 className="display-6">Projects</h1>
      <DialogTemplate
          title="Edit Issue"
          actionBtnText="Create Issue"
          dialogType="form"
          trigger={{
            type: "menu",
            text: "Create Project",
            icon: "bi-pencil-square",
            iconStyle: { marginRight: '10px' },
          }}
        >
          <ProjectForm editMode={null}/>
        </DialogTemplate>
      <TestTable columns={columns} data={data} />

      <Modal show={show.removeModal} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Confirm Remove</Modal.Title>
          <i onClick={handleClose} className="bi bi-x-lg"></i>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { deleteProject(projectId); handleClose() }}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AllProjects