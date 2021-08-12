import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getProjects, postProject, patchProject, deleteProject } from '../store/actions/projectActions'
import '../styles/allProjects.css'
import ProjectForm from '../components/ProjectForm'
import ProjectItem from '../components/ProjectItem'
import { removeError } from '../store/actions/errorActions'
import Table from 'react-bootstrap/Table'
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'

function AllProjects({ projects, users, errors, removeError, postProject, history, patchProject, deleteProject }) {
    const [edit, setEdit] = useState(false)
    const [projectId, setProjectId] = useState("")
    const [show, setShow] = useState({
        createModal: false,
        removeModal: false
    });

    let projectsMap = projects.map((project, i) =>
        <ProjectItem
            key={i}
            setProjectId={setProjectId}
            setEdit={setEdit}
            index={i + 1}
            history={history}
            project={project}
            setShow={setShow}
        />)
    const handleClose = () => setShow(prev => ({...prev, removeModal: false}))
    history.listen(() => {
        removeError()
    })

    const projectDetails = projects.find(project => project._id === projectId)

    return (
        <div className="allProjectsContainer">
            <h1 className="display-6">Projects</h1>
            <button onClick={() => { setEdit(false); setShow(prev => ({ ...prev, createModal: true})) }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">
                Create
            </button>
            <div className="mappedProjects">
                <Table hover>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Start Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectsMap}
                    </tbody>
                </Table>
            </div>
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
                    <Button variant="primary" onClick={handleClose}>
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