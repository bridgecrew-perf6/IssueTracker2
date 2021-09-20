import React from 'react'
import "../styles/projectPage.css"
// import IssueItem from './IssueItem'

function IssuePage(props) {
    const { issue } = props
    if (issue) {
      return (
            <div>
                <div className="projectPageHeader">
                    <h1 className="display-6">{issue.title}</h1>
                    <button type="button" className="btn btn-primary btn-sm">edit</button>
                    <button type="button" className="btn btn-secondary btn-sm">remove</button>
                </div>
                <blockquote className="blockquote">
                    <p>Created By: {issue.createdBy.username}</p>
                </blockquote>
                <div className="issuesTable">
                  { issue.comments.map((c, i) => (
                    <p key={i}>{c}</p>
                  ))}
                </div>
            </div>
        )
    }
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default IssuePage