import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from "react-bootstrap/Modal"
import Select from 'react-select';

function ProjectForm({ project, users, postProject, edit, patchProject, projectId, setProjectId, errors, show, setShow, removeError }) {
    const initialState = {
        projectName: undefined,
        description: undefined,
        targetEndDate: undefined,
        assignedUser: undefined,
    }
    const [state, setState] = useState(initialState)

    const handleClose = () => {
        setShow(prev => ({ ...prev, createModal: false }));
        setState(initialState)
        setProjectId("")
        removeError()
    }

    useEffect(() => {
        if (edit && project) {
            const newDateString = new Date(project.targetEndDate).toISOString().split('T')[0]
            setState({ ...project, targetEndDate: newDateString })
        }
    }, [project, setProjectId, edit])

    const handleSubmit = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "create":
                postProject(state)
                    .then(res => handleClose())
                break
            case "edit":
                patchProject(projectId, state)
                    .then(res => handleClose())
                break
            default:
                return
        }
    }

    //mapping onto a react-select array of objects
    const userOptions = users.map((user, i) => (
        { label: user.username, value: user._id }
    ))
    //filter users for default values of multi select
    const filterUsers = userOptions.filter(user => project?.assignedUsers.includes(user.value))

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleMultipleSelect = e => {
        const newState = e.map(val => val.value)
        setState(prev => ({ ...prev, assignedUsers: newState }))
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{edit ? "Edit Project" : "Create Project"}</Modal.Title>
                    <i onClick={handleClose} className="bi bi-x-lg"></i>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="loginInputs">
                            <div className="mb-3" >
                                <label htmlFor="projectName" className="form-label">Project Name</label>
                                <input value={state.projectName ? state.projectName : ""} onChange={handleChange} type="text" className="form-control" name="projectName" />
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="description" className="form-label">Description</label>
                                <input value={state.description ? state.description : ""} onChange={handleChange} type="text" className="form-control" name="description" />
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="targetEndDate" className="form-label">Target End Date</label>
                                <input value={state.targetEndDate ? state.targetEndDate : ""} onChange={handleChange} type="date" className="form-control" name="targetEndDate" />
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="assignedUsers" className="form-label">User</label>
                                <Select
                                    isMulti
                                    defaultValue={filterUsers}
                                    name="colors"
                                    options={userOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={handleMultipleSelect}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                {errors.message &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "20px", paddingRight: "10px" }}></i>
                        <div>
                            {errors.message}
                        </div>
                    </div>
                }
                <Modal.Footer>
                    {edit ?
                        <>
                            <button onClick={handleClose} type="button" className="btn btn-secondary" >Close</button>
                            <button onClick={handleSubmit} name="edit" type="button" className="btn btn-primary">Edit changes</button>
                        </>
                        :
                        <>
                            <button onClick={handleClose} type="button" className="btn btn-secondary" >Close</button>
                            <button onClick={handleSubmit} name="create" type="button" className="btn btn-primary">Create Project</button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        </div >
    )

}

export default withRouter(ProjectForm)