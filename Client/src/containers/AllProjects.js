import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { getProjects, postProject, patchProject, deleteProject } from '../store/actions/projectActions'
import '../styles/allProjects.css'
import ProjectForm from '../components/ProjectForm'
import { removeError } from '../store/actions/errorActions'
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'
import TestTable from '../components/TestTable'
import { projectColumns } from '../data/columns'

function AllProjects({ projects, users, errors, removeError, postProject, history, patchProject, deleteProject, getProjects }) {
    const [edit, setEdit] = useState(false)
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
                setShow(prev => ({...prev, createModal: true}))
                break
            case "remove": 
                setProjectId(value)
                setShow(prev => ({...prev, removeModal: true}))    
                break
            default:
                return
        }   
    }
    const handleClose = () => setShow(prev => ({ ...prev, removeModal: false }))
    history.listen(() => {
        removeError()
    })
    const columns = useMemo(() => (
        [...projectColumns, { 
            Header: "functions",
            accessor: "_id",
            Cell: ({value}) => (
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
            <button onClick={() => { setEdit(false); setShow(prev => ({ ...prev, createModal: true })) }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">
                Create
            </button>
            <TestTable columns={columns} data={data} />
            <div className="projectForm">
                <ProjectForm
                    edit={edit}
                    postProject={postProject}
                    patchProject={patchProject}
                    projectId={projectId}
                    users={users}
                    errors={errors}
                    project={projectDetails}
                    setProjectId={setProjectId}
                    show={show.createModal}
                    setShow={setShow}
                    removeError={removeError}
                />
            </div>
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

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        errors: state.errors,
        users: state.users,
    }
}

export default connect(mapStateToProps, { getProjects, postProject, patchProject, deleteProject, removeError })(AllProjects)