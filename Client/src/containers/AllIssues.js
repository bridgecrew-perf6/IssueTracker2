import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { postIssue, deleteIssue, patchIssue, getIssues } from '../store/actions/issueActions'
import IssuesForm from '../components/IssuesForm'
import '../styles/allIssues.css'
import { removeError } from '../store/actions/errorActions'
import Modal from "react-bootstrap/Modal"
import Button from 'react-bootstrap/Button'
import TestTable from '../components/TestTable'
import { issueColumns } from '../data/columns'

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

    const handleClick = (e, value) => {
        switch (e.target.name) {
            case "view":
                history.push(`/issues/${value}`)
                break
            case "edit":
                setEdit(true)
                setIssueId(value)
                setShow(prev => ({ ...prev, createModal: true }))
                break
            case "remove":
                setIssueId(value)
                setShow(prev => ({ ...prev, removeModal: true }))
                break
            default:
                return
        }
    }

    const handleClose = () => setShow(prev => ({ ...prev, removeModal: false }))

    history.listen(() => {
        removeError()
    })

    const issueDetails = issues.find(issue => issue._id === issueId)
    const columns = useMemo(() => (
        [...issueColumns, { 
                Header: "functions",
                accessor: "_id",
                Cell: ({value}) => (
                    <>
                        <button onClick={(e) => handleClick(e,value)} name="view">View</button>
                        <button onClick={(e) => handleClick(e,value)} name="edit">edit</button>
                        <button onClick={(e) => handleClick(e,value)} name="remove">remove</button>
                    </>
                )
        }]
    ), [])
    const data = useMemo(() => issues ? issues : [], [issues])

    return (
        <div className="allIssuesContainer">
            <h1 className="display-6">Issues</h1>
            <button onClick={() => { setEdit(false); setShow(prev => ({ ...prev, createModal: true })) }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#issueModal">
                Create Issue
            </button>
            <div className="mappedIssues">
                <TestTable columns={columns} data={data} />
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
                    <Button variant="primary" onClick={() => { deleteIssue(issueId); handleClose() }}>
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