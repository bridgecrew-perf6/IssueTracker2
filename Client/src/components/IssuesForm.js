import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from "react-bootstrap/Modal"
import Select from 'react-select';


function IssuesForm({ issue, postIssue, users, edit, projects, patchIssue, issueId, setIssueId, errors, show, setShow, removeError }) {
    const initialState = {
        title: undefined,
        description: undefined,
        targetEndDate: undefined,
        project: undefined,
        assignedUsers: undefined,
        priority: "low",
        status: "open",
        type: "bugs/error",
    }
    const [state, setState] = useState(initialState)

    const handleClose = () => {
        setShow(false);
        setState(initialState)
        setIssueId("")
        removeError()
    }

    useEffect(() => {
        if (edit && issue) {
            const newDateString = new Date(issue.targetEndDate).toISOString().split('T')[0]
            setState({ ...issue, targetEndDate: newDateString, project: issue.project._id, user: issue.createdBy._id })
        }
    }, [issue, setIssueId, edit])

    const handleSubmit = (e) => {
        e.preventDefault()
        switch (e.target.name) {
            case "create":
                postIssue(state)
                    .then(res => handleClose())
                break
            case "edit":
                patchIssue(issueId, state)
                .then(res => handleClose())
                break
            default:
                return
        }
    }
    //select options for projects
    const projectOptions = projects.map((project, i) => {
        return <option key={i} value={project._id}>{project.projectName}</option>
    })
    //mapping onto a react-select array of objects
    const userOptions = users.map((user, i) => (
        { label: user.username, value: user._id }
    ))
    //filter users for default values of multi select
    const filterUsers = userOptions.filter(user => issue?.assignedUsers.includes(user.value))

    const handleChange = e => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleMultipleSelect = e => {
        const newState = e.map(val => val.value)
        setState(prev => ({ ...prev, assignedUsers: newState }))
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{edit ? "Edit Issue" : "Create Issue"}</Modal.Title>
                    <i onClick={handleClose} className="bi bi-x-lg"></i>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="loginInputs">
                            <div className="mb-3" >
                                <label htmlFor="title" className="form-label">Title</label>
                                <input value={state.title ? state.title : ""} onChange={handleChange} type="text" className="form-control" name="title" />
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
                                <label htmlFor="assignedUsers" className="form-label">Assigned User</label>
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
                            <div className="mb-3" >
                                <label htmlFor="project" className="form-label">Project</label>
                                <select value={state.project ? state.project : ""} name="project" onChange={handleChange} className="form-select" aria-label="Default select example">
                                    <option ></option>
                                    {projectOptions}
                                </select>
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select value={state.priority ? state.priority : "low"} name="priority" onChange={handleChange} className="form-select" aria-label="Default select example">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="status" className="form-label">Status</label>
                                <select value={state.status ? state.status : "open"} name="status" onChange={handleChange} className="form-select" aria-label="Default select example">
                                    <option value="open">Open</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            Work needs to be done here
                            <div className="mb-3" >
                                <label htmlFor="type" className="form-label">Type</label>
                                <select value={state.type ? state.type : "bugs/error"} name="type" onChange={handleChange} className="form-select" aria-label="Default select example">
                                    <option value="bugs/error">Bugs/Error</option>
                                    <option value="feature">Feature</option>
                                </select>
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
                            <button onClick={handleClose} type="button" className="btn btn-secondary">Close</button>
                            <button onClick={handleSubmit} name="edit" type="button" className="btn btn-primary">Edit changes</button>
                        </>
                        :
                        <>
                            <button onClick={handleClose} type="button" className="btn btn-secondary">Close</button>
                            <button onClick={handleSubmit} name="create" type="button" className="btn btn-primary">Create Issue</button>
                        </>
                    }
                </Modal.Footer>
            </Modal>
        </div >
    )

}

export default withRouter(IssuesForm)