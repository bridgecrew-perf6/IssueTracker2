import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postIssue, deleteIssue, patchIssue, getIssues } from '../store/actions/issueActions'
import IssuesForm from '../components/IssuesForm'
import IssueItem from '../components/IssueItem'
import '../styles/allIssues.css'
import { removeError } from '../store/actions/errorActions'
import Table from "react-bootstrap/table"
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'

function AllIssues({ users, issues, postIssue, history, projects, deleteIssue, patchIssue, errors, removeError, getIssues }) {
    const [edit, setEdit] = useState(false)
    const [issueId, setIssueId] = useState("")
    const [show, setShow] = useState({
        createModal: false,
        removeModal: false
    });
    useEffect(() => {
        getIssues()
    }, [getIssues])

    const mappedIssues = issues.map((issue, i) => (
        <IssueItem
            issue={issue}
            key={i}
            index={i + 1}
            history={history}
            setEdit={setEdit}
            setIssueId={setIssueId}
            setShow={setShow}
        />
    ))

    const handleClose = () => setShow(prev => ({ ...prev, removeModal: false }))

    history.listen(() => {
        removeError()
    })

    const issueDetails = issues.find(issue => issue._id === issueId)

    return (
        <div className="allIssuesContainer">
            <h1 className="display-6">Issues</h1>
            <button onClick={() => { setEdit(false); setShow(prev => ({ ...prev, createModal: true })) }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#issueModal">
                Create Issue
            </button>
            <div className="mappedIssues">
                <Table hover>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Created By</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                            <th scope="col">Created</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedIssues}
                    </tbody>
                </Table>
            </div>
            <div>
                <IssuesForm
                    postIssue={postIssue}
                    edit={edit}
                    projects={projects}
                    patchIssue={patchIssue}
                    issueId={issueId}
                    users={users}
                    errors={errors}
                    issue={issueDetails}
                    setIssueId={setIssueId}
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
                <Modal.Body>Are you sure you want to delete this issue</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {deleteIssue(issueId); handleClose()}}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        issues: state.issues,
        errors: state.errors,
        users: state.users,
    }
}

export default connect(mapStateToProps, { getIssues, postIssue, deleteIssue, patchIssue, removeError })(AllIssues)