import React from 'react'

function Item({ issue, index, history, setEdit, setIssueId, small, setShow }) {
    const newDate = new Date(issue.createdAt).toDateString()
    const newTargetDate = new Date(issue.targetEndDate).toDateString()
    const handleClick = (e) => {
        switch (e.target.name) {
            case "view":
                history.push(`/issues/${issue._id}`)
                break
            case "edit":
                setEdit(true)
                setIssueId(issue._id)
                setShow(prev => ({ ...prev, createModal: true }))
                break
            case "remove":
                setIssueId(issue._id)
                setShow(prev => ({ ...prev, removeModal: true }))
                break
            default:
                return
        }
    }
    return (
        <>
            <button name="view" onClick={handleClick}>View</button>
            <button data-bs-toggle="modal" data-bs-target="#issueModal" name="edit" onClick={handleClick}>edit</button>
            <button data-bs-toggle="modal" data-bs-target="#removeIssuesModal" name="remove" onClick={handleClick}>remove</button>
        </>
    )

}

export default Item